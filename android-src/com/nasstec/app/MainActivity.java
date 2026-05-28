package com.nasstec.app;

import android.os.Bundle;
import android.webkit.WebView;
import android.content.pm.PackageManager;
import android.Manifest;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    private static final int CAMERA_PERMISSION_CODE = 1001;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        try { WebView.setWebContentsDebuggingEnabled(false); } catch (Exception e) {}
        super.onCreate(savedInstanceState);
        requestCameraPermissionIfNeeded();
    }

    private void requestCameraPermissionIfNeeded() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA)
                != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this,
                new String[]{ Manifest.permission.CAMERA, Manifest.permission.READ_EXTERNAL_STORAGE },
                CAMERA_PERMISSION_CODE);
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == CAMERA_PERMISSION_CODE && grantResults.length > 0) {
            String event = grantResults[0] == PackageManager.PERMISSION_GRANTED
                ? "cameraPermissionGranted" : "cameraPermissionDenied";
            getBridge().triggerJSEvent(event, "window", "{}");
        }
    }
}
