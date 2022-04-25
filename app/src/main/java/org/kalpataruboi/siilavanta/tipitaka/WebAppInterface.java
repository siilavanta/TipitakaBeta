package org.kalpataruboi.siilavanta.tipitaka;

import static android.content.ContentValues.TAG;

import android.app.Activity;
import android.content.Context;
import android.database.Cursor;
import android.util.Log;
import android.webkit.JavascriptInterface;

public class WebAppInterface {
    Context context;
    Activity activity;

    public WebAppInterface(Context context, Activity activity){
        this.context = context;
        this.activity = activity;

    }
    DatabaseHelper db = new DatabaseHelper(context);
    @JavascriptInterface
    public void finish(){
        activity.finish();
    }

    @JavascriptInterface
    public boolean getBookData(String tableName){
        boolean done = false;
        Cursor cursor = db.getAllData(tableName);
        StringBuffer stringBuffer = new StringBuffer();
        if (cursor.getColumnCount() != 0){
            while (cursor.moveToNext()){
                stringBuffer.append(cursor.getString(1));


            }
            Log.d(TAG, "getBookData: " + stringBuffer);
        }
        return true;
    }
}
