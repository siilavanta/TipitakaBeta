package org.kalpataruboi.siilavanta.tipitaka;

import android.app.Activity;
import android.content.Context;

public class SearchResult {
    Context context;
    Activity activity;
    String arr[] = null;
    int start = 0;
    public SearchResult(Context context, Activity activity, String arr[]){
        this.context = context;
        this.activity = activity;
        this.arr = arr;
    }

    public void findText(String query){

    }
}
