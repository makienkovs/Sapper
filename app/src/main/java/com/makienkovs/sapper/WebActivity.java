package com.makienkovs.sapper;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebView;

public class WebActivity extends AppCompatActivity {
    WebApp webApp;

    @SuppressLint({"SetJavaScriptEnabled", "SourceLockedOrientationActivity"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_web);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        WebView webView = findViewById(R.id.web);
        webApp = new WebApp(this, MainActivity.getSound(), MainActivity.getVibration());
        String url = getIntent().getStringExtra("URL");
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.setWebChromeClient(new WebChromeClient() {
            @Override public boolean onJsAlert(WebView view, String url, String message, JsResult result)
            { return super.onJsAlert(view, url, message, result); } });
        webView.addJavascriptInterface(webApp, "Android");
        webView.loadUrl(url);
    }

    @Override
    protected void onStop() {
        super.onStop();
        webApp.release();
    }

    @Override
    protected void onResume() {
        super.onResume();
        webApp.initParams();
    }
}
