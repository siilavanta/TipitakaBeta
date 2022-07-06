package org.kalpataruboi.siilavanta.tipitaka;

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;
import android.webkit.WebView;

import org.json.JSONArray;

import java.util.ArrayList;

public class Breakup extends SQLiteOpenHelper {
   public static final String databaseName = "breakup_grammar.db";

    public static final String COLM_1 = "id";
    public static final String COLM_2 = "word";
    public static final String COLM_3 = "value";
    private static final String TAG = "breakup";
    private static Breakup mInstance;

    Context context;
    public Breakup(Context context){
        super(context, databaseName, null, 1);

    }

    public static synchronized Breakup getInstance(Context context){
        if (mInstance == null){
            mInstance = new Breakup(context.getApplicationContext());
        }
        return mInstance;
    }
    @Override
    public void onCreate(SQLiteDatabase db) {

    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

    }

    public static void getBreakupWord(WebView webView, Context context, String tableName, String query){
        SQLiteDatabase db = Breakup.getInstance(context).getReadableDatabase();
        String statement = "SELECT * FROM " + tableName+" WHERE word like '"+query+"'";
        Cursor cursor = db.rawQuery(statement, null);

        ArrayList<String> list = new ArrayList<String>();
        if (cursor.getCount() != 0){
            while (cursor.moveToNext() && (cursor.getPosition() < 6)){
                //Log.d(TAG, "getBreakupWord : " + tableName + ": " + cursor.getString(1) + cursor.getPosition());
                //   Toast.makeText(context, tableName + txt, Toast.LENGTH_SHORT).show();

                // 1 position = word, 3 position = meaning
                list.add(cursor.getString(1) + " || " + cursor.getString(2));

            }
            webView.post(new Runnable() {
                @Override
                public void run() {
                    JSONArray jsArray = new JSONArray(list);
                  //   Log.d(TAG, "arr "+ tableName + "=>" + jsArray.toString());
                    webView.evaluateJavascript("setBreakupView('" + tableName + "'," + jsArray+ ", '" +query+"')", null);
                }
            });

           // cursor.close();
           // db.close();
        }else {
            // Log.d(TAG, "getPopUpWordMeaning: not found" );
            webView.post(new Runnable() {
                @Override
                public void run() {
                    webView.evaluateJavascript("setBreakupView('" + tableName + "', [" + "], '" +query+ "')", null);
                }
            });
        }
    }

    public static void getWordGrammar(WebView webView, Context context, String tableName, String query){
        SQLiteDatabase db = Breakup.getInstance(context).getReadableDatabase();
        String statement = "SELECT * FROM " + tableName+" WHERE word like '"+query+"'";
        Cursor cursor = db.rawQuery(statement, null);

        ArrayList<String> list = new ArrayList<String>();
        if (cursor.getCount() != 0){
            while (cursor.moveToNext() && (cursor.getPosition() < 6)){
                //Log.d(TAG, "getWordGrammar : " + tableName + ": " + cursor.getString(1) + cursor.getPosition());
                //   Toast.makeText(context, tableName + txt, Toast.LENGTH_SHORT).show();

                // 1 position = word, 3 position = meaning
                list.add(cursor.getString(1) + " || " + cursor.getString(2));

            }
            webView.post(new Runnable() {
                @Override
                public void run() {
                    JSONArray jsArray = new JSONArray(list);
                   //  Log.d(TAG, "arr "+ tableName + "=>" + jsArray.toString());
                    webView.evaluateJavascript("setBreakupView('" + tableName + "'," + jsArray+ ", '" +query+"')", null);
                }
            });
           // cursor.close();
           // db.close();
        }else {
            // Log.d(TAG, "getPopUpWordMeaning: not found" );
            webView.post(new Runnable() {
                @Override
                public void run() {
                    webView.evaluateJavascript("setBreakupView('" + tableName + "', [" + "], '" +query+ "')", null);
                }
            });
        }
    }


}
