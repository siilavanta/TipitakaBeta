package org.kalpataruboi.siilavanta.tipitaka;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.KeyEvent;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import org.kalpataruboi.siilavanta.tipitaka.R;

@SuppressWarnings("ALL")
public class Help extends AppCompatActivity {

    private WebView help;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_help);
        help = (WebView)findViewById(R.id.help);
        help.loadUrl("file:///android_asset/help.html");
        WebSettings settings = help.getSettings();
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

        help.addJavascriptInterface(new JavascriptInterface(), "BackPress");
        help.setWebViewClient(new WebViewClient());
        help.setWebChromeClient(new WebChromeClient() {

        });

    }

    public class JavascriptInterface {

        @android.webkit.JavascriptInterface
        public  void backpress(){
            finish();
        }
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (event.getAction() == KeyEvent.ACTION_DOWN) {
            switch (keyCode) {
                case KeyEvent.KEYCODE_BACK:
                    if (help.canGoBack()) {
                        help.goBack();

                    }
                    else {
                        finish();
                    }
                    return true;
            }
        }
        return super.onKeyDown(keyCode, event);
    }
}
