
To fix this problem you can one of two things and of course you have to add in the android manifest.xml file.
```xml
<uses-permission android:name="android.permission.INTERNET"/>
```

### Change .execute() for .enqueue()

```java
MyClient api = ServiceGenerator.createService(MyClient.class);
Call<MyItem> call = api.getMyItem(param1, param2, param3);
call.enqueue(new Callback<MyItem>() {
    @Override
    public void onResponse(Call<MyItem> call, Response<MyItem> response) {
        MyItem myItem=response.body();
    }

    @Override
    public void onFailure(Call<MyItem> call, Throwable t) {
        //Handle failure
    }
});
```

You will got the response of the call in the onResponce function.

### Create an async task or a thread.

If you are using .execute() in the call, you will need to use a thread.