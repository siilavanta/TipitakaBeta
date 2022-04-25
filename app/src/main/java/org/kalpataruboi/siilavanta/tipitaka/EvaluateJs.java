package org.kalpataruboi.siilavanta.tipitaka;

import android.app.Activity;
import android.content.Context;
import android.graphics.Color;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.webkit.CookieManager;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ProgressBar;

import androidx.appcompat.app.AppCompatActivity;

public class EvaluateJs {

    Context context;
    Activity activity;
    public EvaluateJs(Context context, Activity activity){
        this.context = context;
        this.activity =  activity;
    }

}
