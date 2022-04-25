package org.kalpataruboi.siilavanta.tipitaka;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.MotionEvent;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.view.animation.TranslateAnimation;
import android.widget.FrameLayout;
import android.widget.HorizontalScrollView;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TabHost;
import android.widget.TabWidget;
import android.widget.Toast;

import java.io.File;

@SuppressWarnings("ALL")
public class TabView extends android.app.TabActivity {
    private ImageView searchicon;
    public ScrollView srlview;
    TipitakaActivity tipitakaActivity;
    public static   TabHost tabHost;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
//        requestWindowFeature(Window.FEATURE_NO_TITLE);
//        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
//                WindowManager.LayoutParams.FLAG_FULLSCREEN);
        super.onCreate(savedInstanceState);
        // screenshot lock
     //   getWindow().setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE);

        srlview = (ScrollView) findViewById(R.id.scroll_id);
        setContentView(R.layout.activity_tab_view);



        tipitakaActivity = new TipitakaActivity();

        final Handler handler = new Handler();
//        handler.postDelayed(new Runnable() {
//            @Override
//            public void run() {
//                //
//            }
//        }, 500);

        tabHost = (TabHost) findViewById(android.R.id.tabhost); // initiate TabHost
        TabHost.TabSpec spec; // Reusable TabSpec for each tab
        Intent intent; // Reusable Intent for each tab

        spec = tabHost.newTabSpec("tab1");
        spec.setIndicator("Tab 1");
        intent = new Intent(this, TipitakaActivity.class);
        spec.setContent(intent);
        tabHost.addTab(spec);


        // Do the same for the other tabs
        spec = tabHost.newTabSpec("tab2"); // Create a new TabSpec using tab host
        spec.setIndicator("Tab 2"); // set the “CONTACT” as an indicator
        intent = new Intent(this, TipitakaActivity.class);
        spec.setContent(intent);
        tabHost.addTab(spec);
        spec = tabHost.newTabSpec("tab3");
        spec.setIndicator("tab 3");
        intent = new Intent(this, TipitakaActivity.class);
        spec.setContent(intent);
        tabHost.addTab(spec);

        spec = tabHost.newTabSpec("tab4"); // Create a new TabSpec using tab host
        spec.setIndicator("Tab 4"); // set the “CONTACT” as an indicator
        intent = new Intent(this, TipitakaActivity.class);
        spec.setContent(intent);
        tabHost.addTab(spec);

        spec = tabHost.newTabSpec("tab5"); // Create a new TabSpec using tab host
        spec.setIndicator("Tab 5"); // set the “CONTACT” as an indicator
        intent = new Intent(this, TipitakaActivity.class);
        spec.setContent(intent);
        tabHost.addTab(spec);

        spec = tabHost.newTabSpec("tab6"); // Create a new TabSpec using tab host
        spec.setIndicator("Tab 6"); // set the “CONTACT” as an indicator
        intent = new Intent(this, TipitakaActivity.class);
        spec.setContent(intent);
        tabHost.addTab(spec);

        spec = tabHost.newTabSpec("tab7"); // Create a new TabSpec using tab host
        spec.setIndicator("Tab 7"); // set the “CONTACT” as an indicator
        intent = new Intent(this, TipitakaActivity.class);
        spec.setContent(intent);
        tabHost.addTab(spec);

        spec = tabHost.newTabSpec("tab8"); // Create a new TabSpec using tab host
        spec.setIndicator("Tab 8"); // set the “CONTACT” as an indicator
        intent = new Intent(this, TipitakaActivity.class);
        spec.setContent(intent);
        tabHost.addTab(spec);

        //set tab which one you want to open first time 0 or 1 or 2
        tabHost.setCurrentTab(0);

        tabHost.setOnTabChangedListener(new TabHost.OnTabChangeListener() {
            @Override
            public void onTabChanged(String tabId) {
                // display the name of the tab whenever a tab is changed
                // Toast.makeText(getApplicationContext(), tabId, Toast.LENGTH_SHORT).show();
            }
        });

    }

    public void gotTab(int position){
        tabHost.setCurrentTab(position);
    }

    public void tabHide(){
        srlview.setVisibility(View.GONE);

    }
    public void tabShow(){
        srlview.setVisibility(View.VISIBLE);
    }

}
