---
tilTags: ['csharp', 'EntityFramework']
title: Soft Delete with EntityFramework Dynamic Filters
date: 2017-07-07
---

## Problem: 

When we turned off the soft delete filter on our Entity Framework DB connection, we got SQL Exception 26: Error Locating Server/Instance Specified. At first we thought it was a SQL Server configuration configuration or permissions issue, but we were able to isolate it to the soft delete filter. 

## Diagnosis: 

The way we set up our Soft Delete Interceptor using the [EntityFramework.DynamicFilters library](https://github.com/jcachat/EntityFramework.DynamicFilters), the soft delete filter was turned on in a base class that extended DbContext. It was set up like this:

``` csharp
class ApplicationDb : SoftDeleteDb 
{
	ApplicationDb(string connectionString, bool softDeleteFilterActive) : base(softDeleteFilterActive)
	{
		Database.Connection.ConnectionString = connectionString;
	
		Database.SetInitializer<ApplicationDb>(null);
	}
}

class SoftDeleteDb : DbContext 
{
	SoftDeleteDb(bool softDeleteFilterActive) 
	{
		if (!softDeleteFilterActive) 
		{
			// extension method for DbContext provided by EntityFramework.DynamicFilters library
            this.DisableFilter(SOFT_DELETE_FILTER_NAME);
		}
	}
}
```

Looking at the [source of the extension method we call](https://github.com/jcachat/EntityFramework.DynamicFilters/blob/8a4ce20782eaf2b627b5bd4e4150956e596e7468/src/EntityFramework.DynamicFilters/DynamicFilterExtensions.cs), it turns out it needs to use the `DbContext`'s `Database.Connection.ConnectionString`.  So, setting the connection string needed to be moved to the SoftDeleteDb constructor. 

The connection string info must be passed as a parameter and set in the SoftDeleteDb constructor, because in C# the base class's constructor must always be called first if the subclass overrides a constructor. That is, the code below doesn't work:

``` csharp
class Subclass : BaseClass 
{
	Subclass(bool param) 
	{
		MyBaseClassProperty = param;
		// line below does not compile
		base();
	}	
}
```

## Solution

Set the `DbContext.Database.Connection.ConnectionString` before calling `DbContext.DisableFilter`. 

``` csharp
class ApplicationDb : SoftDeleteDb 
{
	ApplicationDb(string connectionString, bool softDeleteFilterActive) : base(connectionString, softDeleteFilterActive)
	{	
		Database.SetInitializer<ApplicationDb>(null);
	}
}

class SoftDeleteDb : DbContext 
{
	SoftDeleteDb(string connectionString, bool softDeleteFilterActive) 
	{
		Database.Connection.ConnectionString = connectionString;

		if (!softDeleteFilterActive) 
		{
			// extension method for DbContext provided by EntityFramework.DynamicFilters library
            this.DisableFilter(SOFT_DELETE_FILTER_NAME);
		}
	}
}
```