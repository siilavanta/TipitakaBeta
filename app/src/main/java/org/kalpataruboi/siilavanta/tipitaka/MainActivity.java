package org.kalpataruboi.siilavanta.tipitaka;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Context;
import android.database.Cursor;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.util.Log;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = "myTag";
    Context context;
    Activity activity;

    private String rootDir;
    private String zipPath;
    private String DatabaseDir;
    private String externalRootDir;
    private String externalZipPath;
    String dictionary = "dictionary.zip";
    String tipitaka = "tipitaka.zip";
    TipitakaHelper tipitakaHelper;
    @RequiresApi(api = Build.VERSION_CODES.R)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        context = getApplicationContext();
        activity = MainActivity.this;

        tipitakaHelper = new TipitakaHelper(context, activity);
        tipitakaHelper.webView = findViewById(R.id.tipitakaWeb);
        tipitakaHelper.tipitaka("file:///android_asset/main.html");

        tipitakaHelper.webView.setWebViewClient(new WebViewClient(){
            @Override
            public void onPageFinished(WebView webView, String url){
                mySearch("mula_1_1", "হোতু");
            }
        });

        DeviceInfo deviceInfo = new DeviceInfo(context, MainActivity.this);
        String uid = deviceInfo.getUid();
        String deviceName = deviceInfo.getModelName();
        Log.d(TAG, "deviceName: " + deviceName);
        deviceInfo.getUser();

        Log.d(TAG, "low ram: " + deviceInfo.lowRam);
        Log.d(TAG, "total ram: " + deviceInfo.totRam);
        Log.d(TAG, "av ram: " + deviceInfo.avRam);

        deviceInfo.appVersionCode();
        deviceInfo.appVersionName();
        //deviceInfo.getKeyLang();
        deviceInfo.getLocalLangage();
        deviceInfo.getFreeSpace();

        FileCopy fileCopy = new FileCopy(context, activity);
        rootDir = "data/data/"+ getApplicationContext().getPackageName();
        zipPath = rootDir + "/zipfile";
        DatabaseDir = rootDir+ "/databases";
        externalRootDir = Environment.getExternalStorageDirectory().getAbsolutePath();
        externalZipPath = externalRootDir + "/tipitaka";


        FileHelper fileHelper = new FileHelper(context, activity);



        if (fileCopy.copyFileFromAssets(tipitaka, externalRootDir)){
            Toast.makeText(context,"coping", Toast.LENGTH_LONG).show();
            if (fileHelper.unzip(externalRootDir+ "/" + tipitaka, DatabaseDir)){
                Toast.makeText(context,"unzip done", Toast.LENGTH_LONG).show();
                Log.d(TAG, "onCreate: " + "unzip true");
                fileHelper.deleteFile(externalRootDir, tipitaka);

                String jsInternal = rootDir + "/app/";
                File file = new File(jsInternal);
                if (!file.exists()){
                    file.mkdirs();
                }

                String jsE = Environment.getExternalStorageDirectory().toString() + "/";
                fileHelper.creatFileExternal(jsE, "app.js", "hbfdvhdf");

                fileHelper.createFile(rootDir +"/heloo/", "abc", ".js", "console,log('hhh')\n\"fdhf\"");
            }
        }
       // text("mula_1_1");
//        text("mula_1_2");
//        text("mula_1_3");
//       text("mula_1_4");
//       text("mula_1_5");





    }

    int i = 1;

    public void text(String tableName){
        DatabaseHelper db = new DatabaseHelper(context);
        Cursor cursor = db.getAllData(tableName);
        int key = 1;
        HashMap hashMap = new HashMap();
        ArrayList arrayList = new ArrayList();
        StringBuffer stringBuffer = new StringBuffer();
        StringBuilder stringBuilder = new StringBuilder();
        if (cursor.getColumnCount() != 0){
            while (cursor.moveToNext()){
                stringBuffer.append(cursor.getString(1));
                //stringBuilder.append(cursor.getString(1));
                //arrayList.add(cursor.getString(1));
               //hashMap.put(key++, cursor.getString(1));

                String line = cursor.getString(1);
               if ( cursor.isLast()){
                   Log.d(TAG, "last ele: " + cursor.getString(1));
               }
                if (line.contains("আসনেন")){
                    int find = line.indexOf("আসনেন");
                   // Log.d(TAG, "index: " +tableName + ": " + find + "|" + cursor.getString(2) + "|"  + cursor.getString(3) + ",");
                }
            }

           // Log.d(TAG, "getBookData: " + i++ + stringBuffer);
            //Log.d(TAG, "getBookData: " + i++ + stringBuilder);

            // hashMap = null;
           // arrayList = null;
            //Log.d(TAG, "getBookData: " + i++ + arrayList.get(502));
            //Log.d(TAG, "getBookData: " + i++ + hashMap.get(2));


        }
    }

    String string[] = {"mula_1_1", "mula_1_2","mula_1_3", "mula_1_4","mula_1_5"};
    int start = 1;
    public void mySearch(String tableName, String query){
        DatabaseHelper db = new DatabaseHelper(context);

        Cursor cursor = db.fullSearch(tableName, query);
        if (cursor.getCount() != 0){
            while (cursor.moveToNext()){
                tipitakaHelper.webView.evaluateJavascript("loadtxt(`" + tableName + " => (" + cursor.getString(2)+")" + cursor.getString(1) + "`)", null);
                Log.d(TAG, "last ele: " + tableName +" => " + cursor.getString(1)  + " (" + cursor.getString(2) + ")");
                // Log.d(TAG, "last ele: " + tableName +" => " + cursor.getString(1)  + " (" + cursor.getString(2) + ")");
                if ( cursor.isLast()){
//                    Log.d(TAG, "last ele: " + tableName +" => " + cursor.getString(1)  + " (" + cursor.getString(2) + ")");
                    mySearch(string[start++], query);
                    db.close();
                    EvaluateJs evaluateJs = new EvaluateJs(context, activity);
                   // tipitakaHelper.webView.evaluateJavascript("loadtxt(`" +cursor.getString(1) + "`)", null);

                    if (i< string.length-1){

                    }
                }
            }
        }else {
            Log.d(TAG, "last ele: " + tableName +" => not found ");

        }
    }
}