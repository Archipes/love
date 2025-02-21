async function load() {
    try {
        // 获取当前 URL 的 hash 部分（#user1，#user2）
        let hash = window.location.hash.substring(1);
        if (!hash) {
            hash = "momo";
        }
        // 获取 JSON 数据
        const response = await fetch('data.json');
        const dataAll = await response.json();
        const data = dataAll[hash];  // 存储hash属性的内容
    
        // 解构赋值：从 data 中解构需要的属性
        const { title, yesButton, noButton, question, imageType, noTexts } = data;
    
        // 获取 DOM 元素
        const titleElement = document.getElementById("title");
        const mainImage = document.getElementById("mainImage");
        const questionText = document.getElementById("question");
        const yesButtonElement = document.getElementById("yes");
        const noButtonElement = document.getElementById("no");
    
        // 设置初始内容
        titleElement.innerText = title;
        mainImage.src = `./${hash}/0${imageType}`;
        yesButtonElement.innerText = yesButton;
        noButtonElement.innerText = noButton;
        questionText.innerText = question;
    
        // 记录点击 No 的次数
        let clickCount = 0;
    
        // No 按钮点击事件
        noButtonElement.addEventListener("click", function () {
            clickCount++;
    
            // 让 Yes 变大，每次放大 2 倍
            yesButtonElement.style.transform = `scale(${1 + clickCount * 1.2})`;
    
            // 挤压 No 按钮，每次右移 50px
            noButtonElement.style.transform = `translateX(${clickCount * 50}px)`;
    
            // 让图片和文字往上移动
            const moveUp = clickCount * 25; // 每次上移 25px
            mainImage.style.transform = `translateY(-${moveUp}px)`;
            questionText.style.transform = `translateY(-${moveUp}px)`;  // 修改为正确的变量
    
            // No 文案变化（前 5 次变化）
            if (clickCount < noTexts.length) {
                noButtonElement.innerText = noTexts[clickCount];
                mainImage.src = `${hash}/${clickCount}${imageType}`;
            }
        });
    
        // Yes 按钮点击事件
        yesButtonElement.addEventListener("click", function () {
            const yesTextContent = "最喜欢你了^_^";
            const yesImageSrc = `${hash}/${-1}${imageType}`;
    
            // 替换页面内容为表白成功页面
            document.body.innerHTML = `
                <div class="yes-screen">
                    <h1 class="yes-text">${yesTextContent}</h1>
                    <img src="${yesImageSrc}" alt="拥抱" class="yes-image">
                </div>
            `;
            document.body.style.overflow = "hidden"; // 禁止滚动
        });
    
    } catch (error) {
      console.error('Error reading JSON file:', error);
    }
}

load();
  
