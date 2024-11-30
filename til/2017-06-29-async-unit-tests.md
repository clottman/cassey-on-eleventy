---
tilTags: ['csharp']
title: Async Unit Tests in C#
date: 2017-06-29
---

Today I learned about [ManualResetEventSlim](https://msdn.microsoft.com/en-us/library/system.threading.manualreseteventslim(v=vs.110).aspx) in C#. It's a semaphore class that uses a spin lock for a little bit before switching to a real wait handle, so it can perform well when wait times are expected to be short. My coworker introduced me to how I could use it to simulate an async delay in a mock. 

I used it to write unit tests that test concurrency issues in a client. I wanted to make sure that if register was called, then unregister was called while register was still waiting on an async result from the manager, the client would still end in an unregistered state. 


        using Moq; 
        using FluentAssertions;
        using System.Threading;

        [TestMethod]
        public async Task Client_Register_ThenUnRegister()
        {
            ManualResetEventSlim waitHandle = new ManualResetEventSlim();

            ManagerMock.Setup(RegisterSetup)
                .Returns(() => {
                    return Task.Run(() =>
                    {
                        waitHandle.Wait();
                        return new RegistrationResult();
                    });
                });

            ManagerMock.Setup(UnRegisterWithHubSetup)
                .ReturnsAsync(new UnRegistrationResult());

            // both tasks start running right away but do not block until you call await
            Task registerTask = Client.Register();
            Task unregisterTask = Client.UnRegister();

            // let registerTask continue now that unregisterTask has started
            waitHandle.Set();

            await registerTask;
            await unregisterTask;

            Client.Registered.Should().BeFalse();
        }
