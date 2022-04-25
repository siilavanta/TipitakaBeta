package org.kalpataruboi.siilavanta.tipitaka;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ProgressBar;
import android.widget.Toast;

import org.kalpataruboi.siilavanta.tipitaka.R;

@SuppressWarnings("ALL")
public class MyDictionary extends AppCompatActivity {

    private WebView dictionary;
    private Context context;
    private ProgressBar progressBar;
    private String dicsName[] = {"pbd", "cped", "ped", "ppd", "cepd"};
    @SuppressLint("JavascriptInterface")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_my_dictionary);

        progressBar = (ProgressBar) findViewById((R.id.proBar_dic));
        progressBar.setMax(100);
        progressBar.setVisibility(View.GONE);

        dictionary = (WebView)findViewById(R.id.dictionary);
        context = getApplicationContext();
        WebSettings settings = dictionary.getSettings();
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
        final String url = "data/data/" + getApplicationContext().getPackageName() + "/tipitaka";
        //dictionary.loadUrl("file:///" + url + "/dictionary.html");
        dictionary.loadUrl("file:///android_asset/dictionarynew.html");
        dictionary.setWebViewClient(new WebViewClient());
        dictionary.addJavascriptInterface(new JavascriptInterface(), "android");
        dictionary.setWebChromeClient(new WebChromeClient() {

            @Override
            public void onProgressChanged(WebView view, int progress) {
                progressBar.setProgress(progress);
                if(progress < 100 && progressBar.getVisibility() == ProgressBar.GONE){
                    progressBar.setVisibility(ProgressBar.VISIBLE);
                }
                if(progress == 100){
                    progressBar.setVisibility(ProgressBar.GONE);
                    dictionary.evaluateJavascript("localStorage['divice'] = 'android'", null);

                }

            }

            @Override
            public boolean onJsAlert(WebView view, String Tripitak, String message, final JsResult result){
                AlertDialog dialog = new AlertDialog.Builder(view.getContext()).
                        setTitle("TiPitaka App Says :)").
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
        });

    }

    public class JavascriptInterface {

        @android.webkit.JavascriptInterface
        public  void backpress(){
             finish();
        }
        @android.webkit.JavascriptInterface
         public void mDictionary(String tableName, String listHolder, String query, String functionName){
            if (tableName.contains("pAll")){
                DictionaryHelper.getDictionary(dictionary, context, dicsName[1], listHolder, query, functionName);
                DictionaryHelper.getDictionary(dictionary, context, dicsName[2], listHolder, query, functionName);
                DictionaryHelper.getDictionary(dictionary, context, dicsName[3], listHolder, query, functionName);
                //
            }else {
                DictionaryHelper.getDictionary(dictionary, context, tableName, listHolder, query, functionName);
               // Log.d("tt", "mDictionary: " + tableName);
            }

        }
    }


    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (event.getAction() == KeyEvent.ACTION_DOWN) {
            switch (keyCode) {
                case KeyEvent.KEYCODE_BACK:
                    if (dictionary.canGoBack()) {
                        dictionary.goBack();

                    }
                    else {
                        finish();
                    }
                    return true;
            }
        }
        return super.onKeyDown(keyCode, event);
    }

    public void jsback(){
        if (Build.VERSION.SDK_INT>= Build.VERSION_CODES.KITKAT){
            dictionary.evaluateJavascript("androidback()", null);
        }
    }
    @Override
    public void onDestroy() {
        super.onDestroy();
        jsback();
       // Toast.makeText(this, "distoryed", Toast.LENGTH_SHORT).show();

    }
}
