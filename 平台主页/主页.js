(function() {
    // 全局状态变量
    let isCameraRunning = false;
    let mediaStream = null;
    let uploadedImage = null;

    // 解码二维码图片
    function decodeQRCodeFromImage(img) {
        return new Promise((resolve, reject) => {
            if (img.complete) {
                try {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const code = jsQR(imageData.data, imageData.width, imageData.height);
                    resolve(code ? code.data : null);
                } catch (error) {
                    console.error('二维码解码错误:', error);
                    resolve(null);
                }
            } else {
                img.onload = () => resolve(decodeQRCodeFromImage(img));
                img.onerror = () => resolve(null);
            }
        });
    }

    // 启动摄像头扫码
    function startQRScanner() {
        const qrReader = document.getElementById('qr-reader');
        const video = document.createElement('video');
        video.autoplay = true;
        video.muted = true;
        video.classList.add('w-full', 'h-auto', 'rounded-lg');

        if (isCameraRunning) {
            if (mediaStream) {
                mediaStream.getTracks().forEach(track => track.stop());
            }
            qrReader.innerHTML = '<div class="aspect-video bg-gray-100 rounded-lg flex items-center justify-center"><p class="text-center text-gray-500">等待摄像头启动...</p></div>';
            isCameraRunning = false;
            return;
        }

        qrReader.innerHTML = '';
        qrReader.appendChild(video);

        navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'environment' } 
        })
        .then(stream => {
            mediaStream = stream;
            video.srcObject = stream;
            isCameraRunning = true;
            document.getElementById('camera-placeholder')?.remove();

            function detectQR() {
                if (video.readyState === video.HAVE_ENOUGH_DATA) {
                    const canvas = document.createElement('canvas');
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const code = jsQR(imageData.data, imageData.width, imageData.height);

                    if (code) {
                        mediaStream.getTracks().forEach(track => track.stop());
                        isCameraRunning = false;
                        displayQRData(code.data);
                    } else {
                        requestAnimationFrame(detectQR);
                    }
                } else {
                    requestAnimationFrame(detectQR);
                }
            }

            requestAnimationFrame(detectQR);
        })
        .catch(error => {
            console.error('摄像头权限错误:', error);
            qrReader.innerHTML = '<div class="aspect-video bg-gray-100 rounded-lg flex items-center justify-center"><p class="text-center text-red-500">请允许摄像头权限</p></div>';
        });
    }

    // 显示二维码解析结果（兼容JSON/网址/纯文本）
    function displayQRData(qrCodeMessage) {
        const resultDiv = document.getElementById('qr-result-content');
        if (!qrCodeMessage) {
            resultDiv.innerHTML = '<p class="text-center text-red-600">未检测到有效二维码</p>';
            showQRResultPopup();
            return;
        }

        try {
            // 优先尝试解析JSON
            const data = JSON.parse(qrCodeMessage);
            resultDiv.innerHTML = `
                <div class="space-y-4">
                    <div class="bg-green-50 p-4 rounded-lg">
                        <h4 class="text-lg font-bold text-green-800 mb-2 flex items-center">
                            <i class="fas fa-info-circle mr-2"></i>中药材信息
                        </h4>
                        <p><strong>商品名称:</strong> ${data.chineseName || '未知'}</p>
                        <p><strong>拉丁学名:</strong> ${data.latinName || '未知'}</p>
                        <p><strong>产地:</strong> ${data.origin || '未知'}</p>
                        <p><strong>批次号:</strong> ${data.batchNumber || '未知'}</p>
                        <p><strong>生产日期:</strong> ${data.productionDate || '未知'}</p>
                        <p><strong>保质期:</strong> ${data.expiryDate || '未知'}</p>
                    </div>
                    
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <h4 class="text-lg font-bold text-blue-800 mb-2 flex items-center">
                            <i class="fas fa-user-md mr-2"></i>使用注意事项
                        </h4>
                        <p><strong>适用人群:</strong> ${data.usageNotes?.suitableGroups || '未知'}</p>
                        <p><strong>食用方式:</strong> ${data.usageNotes?.consumptionWay || '未知'}</p>
                        <p><strong>用量控制:</strong> ${data.usageNotes?.dosageControl || '未知'}</p>
                        <p><strong>禁忌人群:</strong> ${data.usageNotes?.contraindications || '未知'}</p>
                        <p><strong>储存方式:</strong> ${data.usageNotes?.storageMethod || '未知'}</p>
                    </div>
                </div>
            `;
        } catch (e) {
            // 处理非JSON情况
            if (qrCodeMessage.startsWith('http') || qrCodeMessage.startsWith('https')) {
                resultDiv.innerHTML = `
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <h4 class="text-lg font-bold text-blue-800 mb-2">检测到网址链接</h4>
                        <p class="mb-3">二维码指向网址：</p>
                        <a href="${qrCodeMessage}" target="_blank" class="block w-fit bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mt-2">
                            <i class="fas fa-external-link-alt mr-2"></i>访问链接
                        </a>
                        <p class="text-sm text-gray-500 mt-3">提示：此链接可能加载外部内容，请注意安全</p>
                    </div>
                `;
            } else {
                // 纯文本内容
                resultDiv.innerHTML = `
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h4 class="text-lg font-bold text-gray-800 mb-2">纯文本内容</h4>
                        <pre class="mt-2 p-3 bg-white border border-gray-200 rounded text-sm overflow-x-auto">${qrCodeMessage}</pre>
                    </div>
                `;
            }
        }
        showQRResultPopup();
    }

    // 显示结果浮窗
    function showQRResultPopup() {
        const popup = document.getElementById('qr-result-popup');
        const overlay = document.getElementById('overlay');
        popup.style.display = 'block';
        overlay.style.display = 'block';
        popup.classList.add('animate-fade-in');
    }

    // 隐藏结果浮窗
    function hideQRResultPopup() {
        const popup = document.getElementById('qr-result-popup');
        const overlay = document.getElementById('overlay');
        popup.style.display = 'none';
        overlay.style.display = 'none';
        popup.classList.remove('animate-fade-in');
    }

    // 页面加载初始化
    document.addEventListener('DOMContentLoaded', function() {
        // 上传二维码图片
        const qrUpload = document.getElementById('qr-upload');
        qrUpload.addEventListener('change', async function(e) {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = async function(event) {
                const img = new Image();
                img.src = event.target.result;
                uploadedImage = img;
                const qrCodeMessage = await decodeQRCodeFromImage(img);
                displayQRData(qrCodeMessage);
            };
            reader.readAsDataURL(file);
        });

        // 开始检测按钮
        const startDetectionBtn = document.getElementById('start-detection-btn');
        startDetectionBtn.addEventListener('click', async function() {
            if (isCameraRunning) return;

            if (!uploadedImage && !qrUpload.files.length) {
                const resultDiv = document.getElementById('qr-result-content');
                resultDiv.innerHTML = '<p class="text-center text-red-600">请先上传二维码图片或打开摄像头</p>';
                showQRResultPopup();
                return;
            }

            let qrCodeMessage = null;
            if (uploadedImage) {
                qrCodeMessage = await decodeQRCodeFromImage(uploadedImage);
            } else {
                const file = qrUpload.files[0];
                const reader = new FileReader();
                reader.onload = async function(event) {
                    const img = new Image();
                    img.src = event.target.result;
                    const code = await decodeQRCodeFromImage(img);
                    displayQRData(code);
                };
                reader.readAsDataURL(file);
                return;
            }

            displayQRData(qrCodeMessage);
        });

        // 打开摄像头按钮
        const startCameraBtn = document.getElementById('start-camera-btn');
        startCameraBtn.addEventListener('click', function() {
            const qrReader = document.getElementById('qr-reader');
            qrReader.style.display = 'block';
            startQRScanner();
        });

        // 关闭浮窗按钮
        const closePopupBtn = document.getElementById('close-popup-btn');
        closePopupBtn.addEventListener('click', hideQRResultPopup);

        // 其他功能（返回顶部/移动端菜单）
        const backToTopButton = document.getElementById('backToTop');
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    });
})();
