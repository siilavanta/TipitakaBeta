package org.kalpataruboi.siilavanta.tipitaka;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ProgressBar;

import org.kalpataruboi.siilavanta.tipitaka.R;

public class MyNotification extends AppCompatActivity {
    private WebView noti;

    private ProgressBar progressBar;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_my_notification);
        noti = (WebView)findViewById(R.id.notification);


        progressBar = (ProgressBar) findViewById((R.id.proBar));
        progressBar.setMax(100);
        progressBar.setVisibility(View.GONE);

        WebSettings settings = noti.getSettings();
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
        noti.addJavascriptInterface(new JavascriptInterface(), "BackPress");
        noti.addJavascriptInterface(new JavascriptInterface(), "UpdateApp");

        final String url = "data/data/" + getApplicationContext().getPackageName() + "/tipitaka";
       // noti.loadUrl("file:///" + url + "/notification.html");
        noti.loadUrl("https://appbeta2.blogspot.com/");
        noti.setWebChromeClient(new WebChromeClient(){

            @Override
            public void onProgressChanged(WebView view, int progress) {
                progressBar.setProgress(progress);
                if(progress < 100 && progressBar.getVisibility() == ProgressBar.GONE){
                    progressBar.setVisibility(ProgressBar.VISIBLE);
                }
                if(progress == 100){
                    progressBar.setVisibility(ProgressBar.GONE);

                }

            }

            @Override
            public boolean onJsAlert(WebView view, String Tripitak, String message, final JsResult result){
                AlertDialog dialog = new AlertDialog.Builder(view.getContext()).
                        setTitle("Tpitaka App Says").
                        setMessage(message).setPositiveButton("Okey", new DialogInterface.OnClickListener() {

                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        //do not nothing
                    }
                }).create();
                dialog.show();
                result.confirm();
                return true;
            }

            @Override
            public boolean onJsConfirm(WebView view, String Tripitak, String message, final JsResult result){
                AlertDialog dialog = new AlertDialog.Builder(view.getContext()).
                        setTitle("Confirm ?").
                        setMessage(message).setPositiveButton("Okey", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {

                        result.confirm();
                    }


                }).
                        setMessage(message).setNegativeButton("No", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        result.cancel();
                    }
                }).create();
                dialog.show();
                return true;
            }
        });

        noti.setWebViewClient(new WebViewClient() {

            @Override
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {


                String html = "<!DOCTYPE html>" +
                        "<html> <meta name=\"viewport\"content=\"width=device-width\">" +
                        "<body>" +
                        "<style>"+
                        "h2{text-align: center;}"+
                        "button{text-align: center; font-size: 24px; align-self: center;}"+
                        "</style>"+
                        "<h2>Please turn on network connection !</h2>" +
                        "<button onclick=\"function goback(){BackPress.backpress()}; goback()\">Go Back</button>" +
                        "</body>" +
                        "</html>";
                noti.loadData(html, "text/html", "UTF-8");

                super.onReceivedError(view, errorCode, description, failingUrl);
            }
        });


    }
    public class JavascriptInterface {

        @android.webkit.JavascriptInterface
        public  void backpress(){
            finish();
        }

        @android.webkit.JavascriptInterface
        public  void updateapp(){
            finish();
            Intent intent = new Intent( Intent.ACTION_VIEW );
            intent.setData( Uri.parse( "https://play.google.com/store/apps/details?id="+ getPackageName() ) );
            startActivity( intent );
        }
    }
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (event.getAction() == KeyEvent.ACTION_DOWN) {
            switch (keyCode) {
                case KeyEvent.KEYCODE_BACK:
                    if (noti.canGoBack()) {
                        noti.goBack();

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
