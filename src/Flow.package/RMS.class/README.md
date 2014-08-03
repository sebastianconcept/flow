##RMS alias RemoteMessageSend

Is a command to send a message to a remote object published in the frontend.

Or..

The command received from the frontend to send a message to an object published here in the backend.

RemoteMessageSends have @answer set before responding to the sender side and if an exception happens they set @isException in true and a print of the exception.

The reason for the short name is merely bandwith optimization