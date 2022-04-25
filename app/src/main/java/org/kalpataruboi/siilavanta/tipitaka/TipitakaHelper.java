package org.kalpataruboi.siilavanta.tipitaka;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.webkit.JsResult;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

public class TipitakaHelper  {
    public WebView webView;
    Context context;
    Activity activity;

    public TipitakaHelper(Context context, Activity activity){
        this.context = context;
        this.activity = activity;
    }
    @SuppressLint({"JavascriptInterface", "SetJavaScriptEnabled"})
    public WebView tipitaka(String url){

        WebSettings settings = webView.getSettings();
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccessFromFileURLs(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setJavaScriptEnabled(true);
        settings.setBuiltInZoomControls(true);
        settings.setDisplayZoomControls(false);
        settings.setLayoutAlgorithm(WebSettings.LayoutAlgorithm.NORMAL);
        settings.setJavaScriptCanOpenWindowsAutomatically(true);
        //settings.setSupportMultipleWindows(true);
        settings.setGeolocationEnabled(true);
        settings.supportMultipleWindows();
        settings.setDatabaseEnabled(true);

        WebAppInterface webAppInterface = new WebAppInterface(context, activity);
        webView.addJavascriptInterface(webAppInterface, "Android");
        webView.loadUrl(url);

        webView.setWebViewClient(new WebViewClient() {

            @Override
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {

                String html = "<!DOCTYPE html>" +
                        "<html> <meta name=\"viewport\"content=\"width=device-width\">" +
                        "<body>" +
                        "দুঃখিত কিছু সমস্যা হচ্ছে" +
                        "</body>" +
                        "</html>";
                webView.loadData(html, "text/html", "UTF-8");
                Toast.makeText(context, "loading fail", Toast.LENGTH_LONG).show();
                super.onReceivedError(view, errorCode, description, failingUrl);

            }

            public boolean onJsAlert(WebView view, String app, String message, final JsResult result){
                AlertDialog dialog = new AlertDialog.Builder(view.getContext()).
                        setTitle(webView.getTitle()).setMessage(message).setPositiveButton( "OK", new DialogInterface.OnClickListener() {

                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        //do not nothing
                    }
                }).create();
                dialog.show();
                result.confirm();
                return true;
            }
        });
        return webView;
    }


}
