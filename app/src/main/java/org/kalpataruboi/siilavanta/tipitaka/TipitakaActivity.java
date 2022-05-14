package org.kalpataruboi.siilavanta.tipitaka;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Rect;
import android.net.Uri;
import android.os.Build;
import android.os.Build.VERSION_CODES;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.Display;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.MotionEvent;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.view.inputmethod.InputMethodManager;
import android.webkit.JavascriptInterface;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import java.io.File;
import java.lang.reflect.Method;


@SuppressLint("JavascriptInterface")
@RequiresApi(api = VERSION_CODES.LOLLIPOP)
@SuppressWarnings( "deprecation" )
public class TipitakaActivity extends AppCompatActivity {

    private static final String TAG = null;
    private int REQUEST_PERMISSION ;
    private WebView tipitaka;
    private LinearLayout container;
    private EditText findBox;
    private TextView searchCount;
    private ImageView previusButton, nextButton, closeButton, searchbtn;
    private LinearLayout buttonView;
    boolean flag = false;
    private FloatingActionButton fbtn;
    public String arr[] = {"mula_1_1", "mula_1_2","mula_1_3", "mula_1_4","mula_1_5"};
    public String dicsName[] = {"cepd", "cped", "pbd", "ped", "ppd"};
    private boolean isFIndboxOpen = false;
    public static boolean lowSpace = false;

    private ProgressBar progressBar;
    Activity activity;
    Context context;
    public boolean isSearchStop = false;
    private boolean isEmty = false;
//    @SuppressLint("SetJavaScriptEnabled")
//    @RequiresApi(api = 30)

   public String findboxText = "";
   TabView tabView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tipitaka);
//        if (ContextCompat.checkSelfPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
//            ActivityCompat.requestPermissions( this,new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE},
//                    REQUEST_PERMISSION );
//        }

        tabView = new TabView();
        context = getApplicationContext();
        activity = TipitakaActivity.this;
        progressBar = findViewById((R.id.progressBar));
        progressBar.setMax(100);
        progressBar.setVisibility(View.GONE);
        tipitaka = findViewById( R.id.webviewId1 );
        tipitaka.setWebViewClient( new WebViewClient() {
            @Override
            public void onPageFinished(WebView webView, String url){

                tipitaka.evaluateJavascript("localStorage['divice'] = 'android'", null);
            }
        });
        tipitaka.clearHistory();
        tipitaka.onFinishTemporaryDetach();
        Bundle bundle = new Bundle();
        tipitaka.saveState(bundle);
        WebSettings settings = tipitaka.getSettings();
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
        //n
        settings.getAllowContentAccess();

       // settings.setLayoutAlgorithm(WebSettings.LayoutAlgorithm.NORMAL);
        //settings.setJavaScriptCanOpenWindowsAutomatically(true);

        //tipitaka.getSettings().setPluginState(WebSettings.PluginState.ON);
        //tipitaka.getSettings().setLoadsImagesAutomatically(true);
        tipitaka.setVerticalScrollBarEnabled(true);
        tipitaka.setHorizontalScrollBarEnabled(true);
        tipitaka.clearCache( false );
        tipitaka.getSettings().setCacheMode(WebSettings.LOAD_NO_CACHE);
        tipitaka.getSettings().setRenderPriority(WebSettings.RenderPriority.NORMAL);
        tipitaka.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
//        if (Build.VERSION.SDK_INT >= VERSION_CODES.O) {
//            tipitaka.setRendererPriorityPolicy(RENDERER_PRIORITY_BOUND, true);
//        }
        tipitaka.getSettings().setAppCachePath(getApplicationContext().getFilesDir().getAbsolutePath() + "/cache");
        tipitaka.getSettings().setDatabasePath(getApplicationContext().getFilesDir().getAbsolutePath() + "/databases");
        tipitaka.addJavascriptInterface( new JavascriptInterface(getApplicationContext()), "android");

        tipitaka.post(new Runnable() {
            @Override
            public void run() {
                tipitaka.loadUrl( "file:///android_asset/main.html" );
            }
        });





        //tipitaka.loadUrl("https://suttacentral.net");
//        String url = "";
//        tipitaka.loadData(url, "text/html", "UTF-8");

//        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP){
//            settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
//        }

//        if (!Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED)){
//            Log.d(TAG, "No SDCARD");
//        } else {
//            myTP1.loadUrl("file://"+Environment.getExternalStorageDirectory()+"/Android/main.html");
//        }

//        if (Build.VERSION.SDK_INT >= VERSION_CODES.KITKAT){
//        }else {
//            myTP1.setLayerType(View.LAYER_TYPE_HARDWARE, null);
//            myTP1.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
//        }
       // myTP1.loadUrl("file:///" +
           //     Environment.getExternalStorageDirectory().getAbsolutePath() + "/myDirectory/index.html");
        String dir = "data/data/"+ getApplicationContext().getPackageName() + "/tipitaka";
        //create folder
        File folder = new File(dir); //folder name
        folder.mkdirs();
        //tipitaka.loadUrl(String.valueOf("file:///" + folder + "/main.html"));

//        tipitaka.setWebViewClient(new WebViewClient() {
//
//            @Override
//            public void onReceivedError(WebView view, int errorCode,
//                                        String description, String failingUrl) {
//                //Log.e(TAG," Error occured while loading the web page at Url"+ failingUrl+"." +description);
//
////                String html = "<!DOCTYPE html>" +
////                        "<html> <meta name=\"viewport\"content=\"width=device-width\">" +
////                        "<body>" +
////                        "</body>" +
////                        "</html>";
////                myTP1.loadData(html, "text/html", "UTF-8");
//                Intent intent;
//                intent = new Intent( TipitakaActivity.this,Unzip.class );
//                startActivity( intent );
//                //finish();
//
//                super.onReceivedError(view, errorCode, description, failingUrl);
//            }
//        });



        tipitaka.setWebChromeClient(new WebChromeClient(){

//       public void onProgressChanged(WebView view, int progress) {
////
////                if (progress < 100) {
////                    //progressDialog.show();
////                }
////                if (progress == 100) {
////                   // progressDialog.dismiss();
////                }
////
////            }

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
                        setTitle("TiPitaka App says :)").
                        setMessage(message).setPositiveButton("Okey", new DialogInterface.OnClickListener() {

                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        //do not nothing
                        if(lowSpace){
                            finish();
                            lowSpace = false;
                        }
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
                        search();
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

        fbtn = (FloatingActionButton) findViewById(R.id.fab);
        if (Build.VERSION.SDK_INT >= VERSION_CODES.M) {
            tipitaka.setOnScrollChangeListener(new View.OnScrollChangeListener() {
                @Override
                public void onScrollChange(View Webview,int scrollX, int scrollY, int oldScrollX, int oldScrollY) {
                    if (scrollY > oldScrollY && scrollY > 0) {

                       // tabView.tabHide();
                        if (!isFIndboxOpen){
                            fbtn.hide();
                        }

                    }
                    if (scrollY < oldScrollY) {
                        if (!isFIndboxOpen){
                            fbtn.show();
                        }
                        //tabView.tabShow();
                    }
                }

            });
        }

        fbtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

               if(!isFIndboxOpen){
                   search();
                   fbtn.hide();
                   isFIndboxOpen = true;
               }


            }

        });
    }


    private void setupData(){
         String rootDir;
         String zipPath;
         String DatabaseDir;
         String externalRootDir;
         String externalZipPath;
        String dictionary = "dictionary.zip";
        String tipitakadb = "tipitaka.zip";
        FileCopy fileCopy = new FileCopy(context, activity);
        rootDir = "data/data/"+ getApplicationContext().getPackageName();
        zipPath = rootDir + "/zipfile";
        DatabaseDir = rootDir+ "/databases";
        externalRootDir = Environment.getExternalStorageDirectory().getAbsolutePath();
        externalZipPath = externalRootDir + "/tipitaka";


        FileHelper fileHelper = new FileHelper(context, activity);



        new Thread() {
            @RequiresApi(api = VERSION_CODES.R)
            @Override
            public void run() {
                DeviceInfo deviceInfo = new DeviceInfo(context, activity);
                int freeSpace = deviceInfo.getFreeSpace();
                if(freeSpace >= 900){
                    if (fileCopy.copyFileFromAssets(tipitakadb, zipPath)) {
                        // Toast.makeText(context,"Copying Database", Toast.LENGTH_LONG).show();

                        if (fileCopy.copyFileFromAssets(dictionary, zipPath)) {
                            copyfinish();
                            if (fileHelper.unzip(zipPath + "/" + tipitakadb, DatabaseDir)) {
                                // Toast.makeText(context,"Unzip Database", Toast.LENGTH_LONG).show();

                                if (fileHelper.unzip(zipPath + "/" + dictionary, DatabaseDir)) {
                                    unzipFinish();
                                }
                                // Log.d(TAG, "onCreate: " + "unzip true");
                                // fileHelper.deleteFile(zipPath, tipitaka);

                                String jsInternal = rootDir + "/app/";
                                File file = new File(jsInternal);
                                if (!file.exists()) {
                                    file.mkdirs();
                                }

                                String jsE = Environment.getExternalStorageDirectory().toString() + "/";
                                // fileHelper.creatFileExternal(jsE, "app.js", "");

                                // fileHelper.createFile(rootDir +"/heloo/", "abc", ".js",
                                // "console,log('hhh')\n\"fdhf\"");
                            }
                        }

                    }
                }else{
                    showAlertDialog(freeSpace);
                    // Log.d(TAG, "run: " + "No free space");
                }
            }
        }.start();
    }

public void copyfinish(){
    tipitaka.post(new Runnable() {
        @Override
        public void run() {
            tipitaka.evaluateJavascript("document.getElementById('loadertext').innerHTML = 'Database Unziping... '", null);
        }
    });
}

    private void showAlertDialog(int freespace) {

        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                final AlertDialog.Builder builder =  new AlertDialog.Builder(TipitakaActivity.this);
                builder.setCancelable(false);
                builder.setTitle("Alert");
                builder.setMessage("You have freespace only " + freespace + " MB.\n" +
                        "Please free up atleast 900 MB and then Tipitaka app open again.");
                //set listeners for dialog buttons

                builder.setPositiveButton("OK", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        finish();
                    }
                });

//        builder.setNegativeButton("NO", new DialogInterface.OnClickListener() {
//            @Override
//            public void onClick(DialogInterface dialog, int which) {
//                //dialog gone
//            }
//        });

                //create the alert dialog and show it
                builder.create().show();
            }
        });
    }

public void unzipFinish(){
    tipitaka.post(new Runnable() {
        @Override
        public void run() {
            tipitaka.evaluateJavascript("document.getElementById('loadertext').innerHTML = 'Loading... '", null);
            tipitaka.evaluateJavascript("document.getElementById('loadermain').style.display = \"none\"", null);
            tipitaka.evaluateJavascript("window.localStorage.setItem('unzip', '1.0.beta_4')", null);
            tipitaka.evaluateJavascript("alert('Unzip Done')", null);

        }
    });
}

public void findTxt(int tableIndex, String query){
        boolean isLastTable = false;

    String tableName = arr[tableIndex];
    //Log.d(TAG, "inedx: " + tableIndex);
    if (tableIndex <= (arr.length -1) && !isSearchStop){
        DatabaseHelper db = new DatabaseHelper(getApplicationContext());
        Cursor cursor = db.fullSearch(tableName, query);


        if (cursor.getCount() != 0){
            while (cursor.moveToNext()){
                gotoData(tableName, cursor.getString(0), cursor.getString(1), cursor.getString(2), cursor.getString(3), query);

               // Log.d(TAG, "findTxt id=>: " + cursor.getString(0));
                //Log.d(TAG, "element: " + tableName +" => " + cursor.getString(1)  + " (" + cursor.getString(2) + ")");
                if ( cursor.isLast()){
                   // Log.d(TAG, "last ele: " + tableName +" => " + cursor.getString(1)  + " (" + cursor.getString(2) + ")");

                    db.close();
                    if (tableIndex != (arr.length -1)){
                        tableIndex++;
                        findTxt(tableIndex, query);
                    }else {
                       // Log.d(TAG, "findTxt: " + "find finished");
                        searchFinish();
                        arr = null;
                    }

                    // tipitakaHelper.webView.evaluateJavascript("loadtxt(`" +cursor.getString(1) + "`)", null);
                }
            }
        }else {
            //Log.d(TAG, "Not found: " + tableName + " => " + query + " not found ");
            if (tableIndex != (arr.length -1)){
                tableIndex++;
                findTxt(tableIndex, query);
            }else {
                //Log.d(TAG, "findTxt: " + "find finished");
                searchFinish();
                arr = null;
            }
        }
    }else if (isSearchStop){
        //Log.d(TAG, "findTxt: " + "find force stop");
        searchFinish();
        arr = null;
        isSearchStop = false;
    }
}



private void searchFinish(){

    tipitaka.post(new Runnable() {
        @Override
        public void run() {
            Toast.makeText(getApplicationContext(), "finish", Toast.LENGTH_LONG).show();
           tipitaka.evaluateJavascript("searchFinished()", null);

        }
    });

}

private void gotoData(String tableName, String i, String chaptxt, String paranum, String chapnum, String query){
    tipitaka.post(new Runnable() {
        @Override
        public void run() {
            String data = "`" + tableName + "`,`" + i + "`,`" + chaptxt + "`,`" + paranum + "`,`" + chapnum + "`, `" + query + "`";
            tipitaka.evaluateJavascript("searchData(" + data + ")", null);
            data = null;
        }
    });
}
    //from javascript to android control
    public class JavascriptInterface {
        Context context;
        TipitakaActivity activity;
        public  JavascriptInterface(Context context){
            this.context = context;
            this.activity = activity;
        }

        @android.webkit.JavascriptInterface
        public  void unzip(){

//            Intent intent;
//            intent = new Intent( TipitakaActivity.this,Unzip.class );
//            startActivity( intent );
           // finish();
            tipitaka.post(new Runnable() {
                @Override
                public void run() {
                    tipitaka.evaluateJavascript("document.getElementById('loadermain').style.display = \"flex\"", null);
                    setupData();
                }
            });

        }

        @android.webkit.JavascriptInterface
        public  String loadBookData(String tableName){
            String data = null;
            DatabaseHelper db = new DatabaseHelper(context);
            Cursor cursor = db.getAllData(tableName);
            StringBuffer stringBuffer = new StringBuffer();
            if (cursor.getColumnCount() != 0){
                while (cursor.moveToNext()){
                    stringBuffer.append(cursor.getString(1));
                    if (cursor.isLast()){
                        data = stringBuffer.toString();
                        stringBuffer = null;
                        db.close();
                    }
                }

            }
           // Log.d(TAG, "getBookData: " + stringBuffer.toString());

            return data;
        }

        @android.webkit.JavascriptInterface
        public void fndText(String tableNames[], String query){
          arr = tableNames;
//            tipitaka.post(new Runnable() {
//                @Override
//                public void run() {
//                    findTxt(0, query);
//                }
//            });

            new Thread() {
                @Override
                public void run() {

                    findTxt(0, query);
                }
            }.start();
        }

        @android.webkit.JavascriptInterface
        public void findStop(){
            isSearchStop = true;

        }

        @android.webkit.JavascriptInterface
        public void getDicMeaning(String query){
            new Thread() {
                @Override
                public void run() {
                DictionaryHelper.getPopUpWordMeaning(tipitaka, getApplicationContext(), dicsName[0], query);
                DictionaryHelper.getPopUpWordMeaning(tipitaka, getApplicationContext(), dicsName[1], query);
                DictionaryHelper.getPopUpWordMeaning(tipitaka, getApplicationContext(), dicsName[2], query);
                DictionaryHelper.getPopUpWordMeaning(tipitaka, getApplicationContext(), dicsName[3], query);
                DictionaryHelper.getPopUpWordMeaning(tipitaka, getApplicationContext(), dicsName[4], query);

                }
            }.start();
        }
        @android.webkit.JavascriptInterface
        public String zeroChapter(String tableName){
            DatabaseHelper databaseHelper = new DatabaseHelper(context);
            String zeroChapter = databaseHelper.getZeorChapter(tableName);
            return zeroChapter;
        }
        @android.webkit.JavascriptInterface
        public void loadBookTemplate(String tableName){
            DatabaseHelper databaseHelper = new DatabaseHelper(context);
           // Toast.makeText(context, tableName, Toast.LENGTH_SHORT).show();
            tipitaka.post(new Runnable() {
                @Override
                public void run() {
                    databaseHelper.bookTemplate(tableName, tipitaka);
                }
            });

        }

        @android.webkit.JavascriptInterface
        public void openChapter(String tableName, String chapterKey, String topKey){
            DatabaseHelper databaseHelper = new DatabaseHelper(context);
            databaseHelper.getChapter(tableName, chapterKey, topKey, tipitaka);

        }
        @android.webkit.JavascriptInterface
        public void openChapterforSearch(String tableName, String chapterKey, String itemIndexSub, String index){
            DatabaseHelper databaseHelper = new DatabaseHelper(context);
            Toast.makeText(context, index , Toast.LENGTH_SHORT).show();
            databaseHelper.getChapterforSearch(tableName, chapterKey, itemIndexSub, index, tipitaka, context);

        }

        @android.webkit.JavascriptInterface
        public void keyboardHideWeb(){
            keyboardHide(tipitaka);
        }
        @android.webkit.JavascriptInterface
        public  void toast(String str){
            Toast.makeText(context, str, Toast.LENGTH_SHORT).show();
        }
        @android.webkit.JavascriptInterface
        public  void dictionary(){
            Intent intent;
            intent = new Intent( TipitakaActivity.this, MyDictionary.class );
            startActivity( intent );


        }
        @android.webkit.JavascriptInterface
        public  void help(){
            Intent intent;
            intent = new Intent( TipitakaActivity.this, Help.class );
            startActivity( intent );


        }

        @android.webkit.JavascriptInterface
        public  void updateapp(){
            Intent intent = new Intent( Intent.ACTION_VIEW );
            intent.setData( Uri.parse( "https://play.google.com/store/apps/details?id="+ getPackageName() ) );
            startActivity( intent );

        }
        @android.webkit.JavascriptInterface
        public  void share(){
            Intent shareinginten = new Intent( Intent.ACTION_SEND );
            shareinginten.setType( "text/plain" );
            String shareBody = "Tipitaka\nhttps://play.google.com/store/apps/details?id=" + getPackageName();
            shareinginten.putExtra( Intent.EXTRA_SUBJECT,"Tpitaka" );
            shareinginten.putExtra( Intent.EXTRA_TEXT, shareBody );
            startActivity(Intent.createChooser( shareinginten,"Share With" ));

        }
        @android.webkit.JavascriptInterface
        public  void rate(){
            Intent intent = new Intent( Intent.ACTION_VIEW );
            intent.setData( Uri.parse( "https://play.google.com/store/apps/details?id="+ getPackageName() ) );
            startActivity( intent );

        }
        @android.webkit.JavascriptInterface
        public  void ourapp(){
            try {
                startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("market://developer?id=")));
            } catch (android.content.ActivityNotFoundException anfe) {
                startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("https://play.google.com/store/apps/developer?id=" + "Kalpataru")));
            }
        }
        @android.webkit.JavascriptInterface
        public  void notification(){
            Intent intent;
            intent = new Intent( TipitakaActivity.this, MyNotification.class );
            startActivity( intent );


        }
        @android.webkit.JavascriptInterface
        public  void about(){
            Intent intent;
            intent = new Intent( TipitakaActivity.this, About.class );
            startActivity( intent );

        }

        @RequiresApi(api = VERSION_CODES.P)
        @android.webkit.JavascriptInterface
        public  void findText(String tableName, String txt){

            DatabaseHelper db = new DatabaseHelper(context);
            Cursor res = db.search(tableName, txt);
            Toast.makeText(getApplicationContext(),txt, Toast.LENGTH_LONG).show();
            if(res.moveToNext()){
            //    Log.d(TAG, "findText: " + tableName + res.getString(6));

            }


        }
    }

    // from webview control javascirpt action
    public void androidtoscript() {

            tipitaka.evaluateJavascript("menushow()", null);

    }
    public void androidtojscontent(){

            tipitaka.evaluateJavascript("tableshow()", null);

    }
    public void androidtojsmore(){
            tipitaka.evaluateJavascript("moreshow()", null);
    }
    public void jsmenuhide(){
            tipitaka.evaluateJavascript("menuhide()", null);
    }
    public void jstablehide(){
            tipitaka.evaluateJavascript("tablehide()", null);
    }
    @SuppressLint("ObsoleteSdkInt")
    public void jsmorehide(){

            tipitaka.evaluateJavascript("morehide(), document.getElementById('dicPanel').style.display = 'none'", null);

    }
    @SuppressLint("ObsoleteSdkInt")
    public void jssettingPanelhede(){

            tipitaka.evaluateJavascript("settingPanelhide()", null);

    }
    @SuppressLint("ObsoleteSdkInt")
    public void jstpsearchhide(){

            tipitaka.evaluateJavascript("tpsearchhide()", null);

    }
    public void jsback(){

            tipitaka.evaluateJavascript("back()", null);

    }

    @SuppressLint("UseCompatLoadingForDrawables")
    public final void search(){

        container = (LinearLayout)findViewById(R.id.layoutId);
        container.setVisibility(View.VISIBLE);



        final LinearLayout.LayoutParams parm =new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, 60);
        parm.gravity = Gravity.CENTER;
        parm.weight = 1.0f;
        parm.leftMargin = 22;
        parm.bottomMargin = 5;
        parm.topMargin = 5;

        findBox = new EditText(this);
        findBox.setFocusable(true);
        findBox.setText(findboxText);
        findBox.setMinEms(80);
        findBox.setSingleLine(true);
        findBox.setTextColor(getResources().getColor(R.color.black));
        // request focus
        findBox.requestFocus();
        InputMethodManager imm = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
        imm.showSoftInput(findBox, InputMethodManager.SHOW_FORCED);

        //findBox.setBackgroundColor(getResources().getColor(R.color.background_buttom));
        findBox.setBackground(getResources().getDrawable(R.drawable.edittext));
        findBox.setPadding(10, 1,5,1);
        findBox.setHint("এই পেইজে খুঁজুন");
        findBox.setTextSize(16);
        findBox.setLayoutParams(parm);
      //  Log.d(TAG, "search: " + findboxText);
        //tipitaka.findNext(true);
        sv();




//        findBox.setOnKeyListener(new View.OnKeyListener(){
//
//            public boolean onKey(View v, int keyCode, KeyEvent event){
//
//                //(event.getAction() == KeyEvent.ACTION_DOWN) && ((keyCode == KeyEvent.KEYCODE_ENTER))
//                if((event.getAction() == KeyEvent.ACTION_DOWN) && ((keyCode == KeyEvent.KEYCODE_ENTER))){
//                    tipitaka.findAllAsync(findBox.getText().toString());
//                    tipitaka.setFindListener(new WebView.FindListener() {
//                        @Override
//                        public void onFindResultReceived(int i, int i1, boolean b) {
//                            Log.d(TAG, "onFindResultReceived i: "+ i );
//                            Log.d(TAG, "onFindResultReceived i1: "+ i1 );
//                            Log.d(TAG, "onFindResultReceived: b"+ b );
//
//
//                        }
//                    });
//                    try{
//                        Method m = WebView.class.getMethod("setFindIsUp", Boolean.TYPE);
//                        m.invoke(tipitaka, true);
//                    }catch(Exception ignored){
//                    }
//                }
//                return false;
//            }
//        });
        findBox.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
               // sv();
            }
        });

        findBox.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                findboxText =  findBox.getText().toString();
                Log.d(TAG, "onTextChanged: " + findboxText);
            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                if (charSequence.length() == 0){
                    //Log.d(TAG, "onTextChanged >: no text ");
                    isEmty = true;
                }

                sv();
            }

            @Override
            public void afterTextChanged(Editable editable) {

            }
        });
//        findBox.setOnKeyListener(new View.OnKeyListener() {
//            @Override
//            public boolean onKey(View v, int keyCode, KeyEvent event) {
//
//                String query = findBox.getText().toString().trim();
//                if (TextUtils.isEmpty(query)) {
//                    return false;
//                }
//                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
//                    tipitaka.setFindListener(new WebView.FindListener() {
//                        @Override
//                        public void onFindResultReceived(int activeMatchOrdinal, int numberOfMatches, boolean isDoneCounting) {
//                            if (isDoneCounting) {
//                                handleFindResults(numberOfMatches);
//
//                            }
//                        }
//                    });
//                    tipitaka.findAllAsync(query);
//                } else {
//                    //noinspection deprecation
//                    handleFindResults(tipitaka.findAll(query));
//                }
//                return false;
//            }
//        });

        container.addView(findBox);

        //button group add
        buttonView = new LinearLayout(this);
        LinearLayout.LayoutParams lpara = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
        lpara.weight = 0.9f;
        lpara.gravity = Gravity.CENTER;
        buttonView.setLayoutParams(lpara);

        container.addView(buttonView);

        LinearLayout.LayoutParams btnParm = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT);
        btnParm.weight = 1.0f;
        btnParm.gravity = Gravity.CENTER;


        searchCount = new TextView(this);
        searchCount.append("0/0");
        searchCount.setPadding(24, 0,10,0);
        searchCount.setLayoutParams(btnParm);
        searchCount.setTextSize(17);
        buttonView.addView(searchCount);



        previusButton = new ImageView(this);
        previusButton.setFocusable(true);
        previusButton.setClickable(true);
        previusButton.setImageDrawable(getResources().getDrawable(R.drawable.ic_up));
        previusButton.setPadding(20, 15,10,10);
        previusButton.setLayoutParams(btnParm);
        previusButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                tipitaka.findNext(false);

            }
        });
        buttonView.addView(previusButton);

        nextButton = new ImageView(this);
        nextButton.setImageDrawable(getResources().getDrawable(R.drawable.ic_down));
        nextButton.setClickable(true);
        nextButton.setFocusable(true);
        nextButton.setPadding(20, 15,10,10);
        nextButton.setLayoutParams(btnParm);
        nextButton.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v){
                tipitaka.findNext(true);

            }
        });
        buttonView.addView(nextButton);



        searchbtn = new ImageView(this);
        searchbtn.setImageDrawable( getResources().getDrawable(R.drawable.ic_search));
        searchbtn.setPadding(20, 15,10,10);
        searchbtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                tipitaka.findAll(findBox.getText().toString());
            }
        });
       // container.addView(searchbtn);

        closeButton = new ImageView(this);
        closeButton.setPadding(20, 15,10,10);
        closeButton.setImageDrawable(getResources().getDrawable(R.drawable.ic_close));
        closeButton.setLayoutParams(btnParm);
        closeButton.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v){
                findboxText =  findBox.getText().toString();
                container.removeAllViews();
                findBox.getText().clear();
                tipitaka.findAll(findBox.getText().toString());
                isFIndboxOpen = false;
                container.setVisibility(View.GONE);
                fbtn.show();

            }
        });

        buttonView.addView(closeButton);
    }



    public void sv(){
        tipitaka.findAllAsync(findBox.getText().toString());
        tipitaka.setFindListener(new WebView.FindListener() {
            @Override
            public void onFindResultReceived(int i, int i1, boolean b) {
//                Log.d(TAG, "onFindResultReceived i: "+ i );
//                Log.d(TAG, "onFindResultReceived i1: "+ i1 );
//                Log.d(TAG, "onFindResultReceived: b"+ b );
                String res = (i +1) + "/" +i1;
                searchCount.setText(res);
                if(isEmty){
                    searchCount.setText("0/0");
                    isEmty = false;
                }else if (i1 == 0){
                    searchCount.setText("0/0");
                }
               // Toast.makeText(getApplicationContext(), String.valueOf(i1), Toast.LENGTH_SHORT).show();


            }
        });
        try{
            Method m = WebView.class.getMethod("setFindIsUp", Boolean.TYPE);
            m.invoke(tipitaka, true);
        }catch(Exception ignored){
        }
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event){
        if (keyCode == KeyEvent.KEYCODE_F){
            //Log.d(TAG, "up: f " + keyCode);
            return true;
        }
        return super.onKeyUp(keyCode, event);
    }


    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (event.getAction() == KeyEvent.ACTION_DOWN) {
           // Log.d(TAG, "onKeyDown: " + keyCode);
            switch (keyCode) {
                case KeyEvent.KEYCODE_BACK:
                    if (tipitaka.canGoBack()) {
                        tipitaka.goBack();
                        jsmenuhide(); jstablehide(); jsmorehide(); jssettingPanelhede(); jstpsearchhide();
                        tipitaka.evaluateJavascript("noteclose()", null);

                    }
                    else {
                        jsmenuhide(); jstablehide(); jsmorehide(); jssettingPanelhede(); jstpsearchhide();
                        onBackPressed();
                        tipitaka.evaluateJavascript("noteclose()", null);
                    }

                    return true;
            }


        }


        return super.onKeyDown(keyCode, event);
    }

    boolean doubleBackToExitPressedOnce = false;

    @Override
    public void onBackPressed() {
        if (doubleBackToExitPressedOnce) {
            //Toast.makeText(getApplicationContext(), "bb", Toast.LENGTH_SHORT).show();
            super.onBackPressed();
            return;
        }
        if (isFIndboxOpen){
            findboxText =  findBox.getText().toString();

            container.removeAllViews();
            findBox.getText().clear();
            tipitaka.findAll(findBox.getText().toString());
            isFIndboxOpen = false;
            container.setVisibility(View.GONE);
            fbtn.show();
          //  Log.d(TAG, "onBackPressed: " + findboxText);
        }
        this.doubleBackToExitPressedOnce = true;
        Toast.makeText(this, "Please click BACK again to exit", Toast.LENGTH_SHORT).show();

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                doubleBackToExitPressedOnce=false;
            }
        }, 2000);
    }

    int option = 0;
    @Override
    public boolean dispatchKeyEvent(KeyEvent event){

         if (event.getAction() == KeyEvent.ACTION_DOWN ){
//
        }

        if (event.getAction() == KeyEvent.ACTION_DOWN ){

            switch (event.getKeyCode()){
                case  KeyEvent.KEYCODE_F:
             //   Log.d(TAG, "dispatchKeyEvent: " + event.getKeyCode());
                if(!isFIndboxOpen ){
                    search();
                    fbtn.hide();
                    isFIndboxOpen = true;
                }else if (isFIndboxOpen){
                    // request focus
                    findBox.requestFocus();
                    InputMethodManager imm = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
                    imm.showSoftInput(findBox, InputMethodManager.SHOW_FORCED);
                }

                break;
                case KeyEvent.KEYCODE_D:
                    try {
                        tipitaka.evaluateJavascript("dicpanel.style.display = 'block';\ndocument.getElementById('inputid').focus()", null);
                    } catch (Exception e){

                    }
                break;
            }

            if (event.getKeyCode() == KeyEvent.KEYCODE_ENTER && isFIndboxOpen){
                try {
                    tipitaka.findNext(true);
                } catch (Exception e){

                }
            }


        }

        return super.dispatchKeyEvent(event);
    }

    private void keyboardHide(@NonNull View view){
       // Log.d(TAG, "keyboardHide: ");
            InputMethodManager imm = (InputMethodManager) getSystemService( Context.INPUT_METHOD_SERVICE );
            assert imm != null;
            imm.hideSoftInputFromWindow( view.getWindowToken(), 0 );
    }
    @Override
    public boolean dispatchTouchEvent(@NonNull MotionEvent event){
        if (event.getAction() == MotionEvent.ACTION_DOWN){
            View view = getCurrentFocus();
            if (view instanceof EditText){
                Rect outRect = new Rect(  );
                view.getGlobalVisibleRect( outRect );
                if (!outRect.contains(( int )event.getRawX(), (int)event.getRawY())){
                    //view.clearFocus();
                    InputMethodManager imm = (InputMethodManager) getSystemService( Context.INPUT_METHOD_SERVICE );
                    assert imm != null;
                    imm.hideSoftInputFromWindow( view.getWindowToken(), 0 );
                }
            }
        }
        return super.dispatchTouchEvent(event);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        tipitaka.clearCache(true);
        tipitaka.clearHistory();
        jsback();
    }
}
