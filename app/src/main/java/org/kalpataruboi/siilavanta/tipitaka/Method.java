package org.kalpataruboi.siilavanta.tipitaka;

import android.app.Activity;
import android.content.Context;

public class Method{
    Activity activity;
    Context context;

    DatabaseHelper db;
    public Method(){

    }
    public Method(Context context, Activity activity){
        this.context = context;
        this.activity = activity;
        db = new DatabaseHelper(context);

    }


}
