package org.kalpataruboi.siilavanta.tipitaka;

import android.app.Activity;
import android.content.Context;
import android.webkit.WebView;

public class CompareView extends TipitakaHelper {
    Context context;
    Activity activity;
    WebView compareView;
    public CompareView(Context context, Activity activity){

        super(context, activity);
    }

    public WebView getCompareView(WebView webView){

        return  webView;
    }

}
