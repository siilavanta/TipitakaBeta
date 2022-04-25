package org.kalpataruboi.siilavanta.tipitaka;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.KeyEvent;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class Help2 extends AppCompatActivity {

    private WebView help2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_help2);
        help2 = (WebView)findViewById(R.id.help2);
        help2.loadUrl("file:///android_asset/help.html");
        WebSettings settings = help2.getSettings();
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setDatabaseEnabled( true );
        settings.setAllowFileAccessFromFileURLs(true);
        settings.setDomStorageEnabled( true );
        settings.setAllowFileAccess(true);
        settings.setJavaScriptEnabled(true);
        settings.setBuiltInZoomControls(true);
        settings.setDisplayZoomControls(false);
        settings.setSaveFormData(true);
        settings.setLayoutAlgorithm(WebSettings.LayoutAlgorithm.NORMAL);
        settings.setJavaScriptCanOpenWindowsAutomatically(true);
        help2.setWebViewClient(new WebViewClient());
        help2.setWebChromeClient(new WebChromeClient() {

        });

    }
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (event.getAction() == KeyEvent.ACTION_DOWN) {
            switch (keyCode) {
                case KeyEvent.KEYCODE_BACK:
                    if (help2.canGoBack()) {
                        help2.goBack();

                    }
                    else {


                        Intent intent;
                        intent = new Intent( Help2.this, MainActivity.class );
                        startActivity( intent );
                    }
                    return true;
            }
        }
        return super.onKeyDown(keyCode, event);
    }
}
