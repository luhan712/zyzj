function decodeQRCodeFromImage(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log('imageData:', imageData); // 调试：输出图像数据信息
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    console.log('jsQR 解码结果:', code); // 调试：输出解码结果
    if (code) {
        return code.data;
    }
    return null;
}

// 启动/停止二维码扫描器（摄像头模式）
let isCameraRunning = false;
let mediaStream = null; // 存储媒体流，用于停止摄像头
function startQRScanner() {
    const qrReader = document.getElementById('qr-reader');
    const video = document.createElement('video');
    if (isCameraRunning) {
        // 停止摄像头逻辑
        if (mediaStream) {
            const tracks = mediaStream.getTracks();
            tracks.forEach(track => track.stop());
        }
        qrReader.innerHTML = ''; // 清空视频元素
        isCameraRunning = false;
        return;
    }
    qrReader.appendChild(video);

    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
       .then(function (stream) {
            mediaStream = stream;
            video.srcObject = stream;
            video.play();
            isCameraRunning = true;
            requestAnimationFrame(tick);
        })
       .catch(function (error) {
            console.error('无法访问摄像头:', error);
            // 可在此处给用户提示，比如页面显示“摄像头访问失败，请检查权限”
        });

    function tick() {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            if (code) {
                // 扫描到二维码，停止扫描
                if (mediaStream) {
                    const tracks = mediaStream.getTracks();
                    tracks.forEach(track => track.stop());
                }
                qrReader.innerHTML = '';
                isCameraRunning = false;
                displayQRData(code.data);
            } else {
                requestAnimationFrame(tick);
            }
        } else {
            requestAnimationFrame(tick);
        }
    }
}

// 显示二维码解析结果到浮窗
function displayQRData(qrCodeMessage) {
    console.log('原始二维码内容:', qrCodeMessage); // 调试：输出原始内容
    const resultDiv = document.getElementById('qr-result-content');
    try {
        const data = JSON.parse(qrCodeMessage);
        resultDiv.innerHTML = `
            <p><strong>中药名:</strong> ${data.chineseName || '未知'}</p>
            <p><strong>拉丁名:</strong> ${data.latinName || '未知'}</p>
            <p><strong>产地:</strong> ${data.origin || '未知'}</p>
            <p><strong>批次号:</strong> ${data.batchNumber || '未知'}</p>
            <p><strong>生产日期:</strong> ${data.productionDate || '未知'}</p>
            <p><strong>保质期:</strong> ${data.expiryDate || '未知'}</p>
            <p><strong>二维码编号:</strong> ${data.qrCodeId || '未知'}</p>
            <p><strong>收获时间:</strong> ${data.harvestDate || '未知'}</p>
            <p><strong>生长日期:</strong> ${data.growthDate || '未知'}</p>
        `;
        showQRResultPopup();
    } catch (e) {
        console.error('JSON 解析错误:', e);
        resultDiv.innerHTML = `<p class="text-red-600">二维码数据格式错误，原始内容：${qrCodeMessage}</p>`;
        showQRResultPopup();
    }
}

// 显示结果浮窗
function showQRResultPopup() {
    const popup = document.getElementById('qr-result-popup');
    const overlay = document.getElementById('overlay');
    popup.style.display = 'block';
    overlay.style.display = 'block';
}

// 隐藏结果浮窗
function hideQRResultPopup() {
    const popup = document.getElementById('qr-result-popup');
    const overlay = document.getElementById('overlay');
    popup.style.display = 'none';
    overlay.style.display = 'none';
}

// 页面加载完成后初始化交互逻辑
document.addEventListener('DOMContentLoaded', function () {
    // 监听文件上传（二维码图片）
    const qrUpload = document.getElementById('qr-upload');
    let uploadedImage = null;
    qrUpload.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const img = new Image();
                img.src = event.target.result;
                uploadedImage = img;
            };
            reader.onerror = function (error) {
                console.error('文件读取错误:', error);
                // 可在此处给用户提示，比如页面显示“图片读取失败，请重新上传”
            };
            reader.readAsDataURL(file);
        }
    });

    // 监听“开始检测”按钮（上传图片模式）
    const startDetectionBtn = document.getElementById('start-detection-btn');
    startDetectionBtn.addEventListener('click', function () {
        console.log('uploadedImage:', uploadedImage); // 调试：输出上传的图片对象
        if (uploadedImage) {
            const qrCodeMessage = decodeQRCodeFromImage(uploadedImage);
            if (qrCodeMessage) {
                displayQRData(qrCodeMessage);
            } else {
                const resultDiv = document.getElementById('qr-result-content');
                resultDiv.innerHTML = '<p class="text-red-600">未检测到二维码，请上传包含二维码的图片。</p>';
                showQRResultPopup();
            }
        } else {
            const resultDiv = document.getElementById('qr-result-content');
            resultDiv.innerHTML = '<p class="text-red-600">请先上传二维码图片。</p>';
            showQRResultPopup();
        }
    });

    const closePopupBtn = document.getElementById('close-popup-btn');
    closePopupBtn.addEventListener('click', hideQRResultPopup);

    const startCameraBtn = document.getElementById('start-camera-btn');
    startCameraBtn.addEventListener('click', function () {
        const qrReader = document.getElementById('qr-reader');
        qrReader.style.display = 'block';
        startQRScanner();
    });

    const backToTopButton = document.getElementById('backToTop');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    backToTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior:'smooth'
        });
    });

    // 移动端菜单切换
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
    });
});