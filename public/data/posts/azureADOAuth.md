How to connect your C# code with Azure AD (Azure Active Directory) application for use as role-based access control.

Here some docs from microsoft:

- [How to create a new Azure AD](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal)
- [How to manage users in the Power Platform admin center](https://docs.microsoft.com/en-us/power-platform/admin/manage-application-users)

At this point you should have an Azure AD application with a Client Secret and a powerapps environment with the application user.

 


### Requirements 
- [ClientSecret (Azure AD)](/assets/images/posts/AzureADOAuth/secretid.png)
- [ClientID (Azure AD)](/assets/images/posts/AzureADOAuth/clientid.png)
- URL (PowerApps Developer Options)
- [TenantID (Azure AD)](/assets/images/posts/AzureADOAuth/clientid.png)


> **Be careful with this keys, don't share or push into your repository this information**

### Obtaining OAuth Token
By using [Microsoft.IdentityModel.Clients.ActiveDirectory Namespace](https://docs.microsoft.com/en-us/dotnet/api/microsoft.identitymodel.clients.activedirectory?view=azure-dotnet)  you get an authentication token that you can use to identify your app to access your API without login manually with your credentials.
 


```c#
AuthenticationContext authContext = new AuthenticationContext("https://login.microsoftonline.com/" + <TenatID>);
ClientCredential credential = new ClientCredential(<ClientID, <ClientSecret>);

AuthenticationResult result = authContext.AcquireTokenAsync(AzureDetails.url, credential).Result;
});
```

