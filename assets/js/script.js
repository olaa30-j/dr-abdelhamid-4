// Webinar Registration System
const CONFIG = {
    APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbzmuctpf-wvcIimvSykxwCWu9yv0R4ustyJGhAUiL206ojcou6s8X-wdN1UJ6y9gPay/exec",
    WEBINAR_TITLE: "علاج الألم العصبي: أحدث الطرق والتقنيات",
    WEBINAR_DATE: "15 ديسمبر 2025",
    WEBINAR_TIME: "8:00 مساءً بتوقيت القاهرة",
    WEBINAR_LINK: "https://example.com/webinar-link",
    COMPANY_NUMBER: "201200241817",
    COMPANY_EMAIL: "olaadel.967@gmail.com",
    WEBSITE_NAME: "موقع_الندوات_الطبية_4",
    RECAPTCHA_SITE_KEY: "6LduhQsrAAAAAMpRjpSqis-_UNyVy7KUq8GTL5k4",

    COUNTRIES: [
        { code: "EG", name: "مصر", dialCode: "20", flag: "🇪🇬" },
        { code: "SA", name: "السعودية", dialCode: "966", flag: "🇸🇦" },
        { code: "AE", name: "الإمارات", dialCode: "971", flag: "🇦🇪" },
        { code: "KW", name: "الكويت", dialCode: "965", flag: "🇰🇼" },
        { code: "QA", name: "قطر", dialCode: "974", flag: "🇶🇦" }
    ]
};

const WHATSAPP_MESSAGE_TEMPLATE = `مرحباً {name}،

شكراً لتسجيلك في ندوتنا "${CONFIG.WEBINAR_TITLE}"

التفاصيل:
📅 التاريخ: ${CONFIG.WEBINAR_DATE}
⏰ الوقت: ${CONFIG.WEBINAR_TIME}
🔗 رابط الندوة: ${CONFIG.WEBINAR_LINK}

للمساعدة أو الاستفسار، يرجى اختيار أحد الخيارات التالية:
1️⃣ استفسار عن رابط الندوة
2️⃣ استفسار عن موعد الندوة
3️⃣ استفسار عن المحتوى العلمي
4️⃣ تواصل مع فريق الدعم

أو اكتب استفسارك مباشرة وسنكون سعداء بمساعدتك.

مع تحيات،
فريق ${CONFIG.WEBINAR_TITLE}`;

// Global variables
let lastSubmissionTime = 0;
let countdownTimer;

// Initialize everything when DOM is loaded
window.addEventListener('load', function () {
    initCountdown();
    initModal();
    initForm();
});

// Countdown initialization
function initCountdown() {
    const webinarDate = new Date('April 29, 2025 13:00:00 GMT+0200').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = webinarDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownTimer);
            document.getElementById('countdown-section').innerHTML = `
                <div class="bg-white/20 p-4 rounded-lg text-center">
                    <h3 class="font-bold">الندوة قد بدأت!</h3>
                    <p>يمكنك الانضمام الآن عبر الرابط التالي:</p>
                    <a href="${CONFIG.WEBINAR_LINK}" class="text-red-600 font-bold underline mt-2 inline-block">
                        انضم إلى الندوة
                    </a>
                </div>
            `;
        }
    }

    countdownTimer = setInterval(updateCountdown, 1000);
    updateCountdown();
}


// Modal system
function initModal() {
    // Check if modal already exists
    if (document.getElementById('success-modal')) return;

    const modalHTML = `
    <div id="success-modal" class="d-none" style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-image:url('assets/img/success.gif');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        display: flex;
        align-items: center;
        text-align:center;
        justify-content: center;
        z-index: 9999;
        overflow: hidden;
        animation: fadeIn 0.3s ease-out;
        font-family: 'Tajawal', Arial, sans-serif;
    ">
        <div style="
            background-color: rgba(255, 255, 255, 0.85);
            padding: 2.5rem;
            border-radius: 16px;
            width: 100vw;
            height: 100vh;
            position: relative;
            background-image:url('assets/img/success.gif);
            box-shadow: 0 10px 30px rgba(0, 21, 83, 0.2);
            backdrop-filter: blur(5px);
            border: 1px solid rgba(0, 21, 83, 0.1);
            text-align: center;
        ">
            <span class="close-modal" style="
                position: absolute;
                top: 20px;
                right: 20px;
                color: #001553;
                font-size: 28px;
                cursor: pointer;
                transition: all 0.2s;
                line-height: 1;
                padding: 5px;
            ">&times;</span>
            
            <div style="margin-bottom: 25px;">
                <h3 style="
                    color: #001553;
                    font-size: 26px;
                    font-weight: 700;
                    margin-bottom: 25px;
                ">تم التسجيل بنجاح!</h3>
                
                <p style="
                    color: #555;
                    font-size: 21px;
                    margin-bottom: 30px;
                    font-weight: 500;
                    line-height: 1.6;
                ">سيصلك رابط الندوة على الواتساب قبل موعدها</p>
                
                <!-- Lecturer Info -->
                <div style="
                    margin: 30px 0;
                    padding: 20px 0;
                    border-top: 1px solid #eee;
                    border-bottom: 1px solid #eee;
                ">
                    <img src="assets/img/favicon.jpg" alt="المحاضر" style="
                        width: 120px;
                        height: 120px;
                        border-radius: 50%;
                        object-fit: cover;
                        border: 3px solid #001553;
                        margin: 0 auto 15px;
                        display: block;
                    ">
                    
                    <h4 style="
                        color: #001553;
                        font-size: 22px;
                        font-weight: 700;
                        margin-bottom: 5px;
                    ">د. عبد الحميد حمد</h4>
                    
                    <p style="
                        color: #666;
                        font-size: 16px;
                        margin-bottom: 20px;
                    ">استشاري و خبير علاج الألم</p>

                      <div style="
                        display: flex;
                        justify-content: center;
                        gap: 20px;
                        flex-wrap: wrap;
                    ">
                        <a href="https://www.youtube.com/@DrAbdulHamidHamad" target="_blank" style="
                            color: #ff0000;
                            font-size: 28px;
                            transition: transform 0.2s;
                            display: inline-block;
                        " onmouseover="this.style.transform='scale(1.2)'"
                        onmouseout="this.style.transform='scale(1)'">
                            <i class="fab fa-youtube"></i>
                        </a>
                        
                        <a href="https://www.facebook.com/p/الدكتور-عبد-الحميد-حمد-100091952990054/" target="_blank" style="
                            color: #1877f2;
                            font-size: 28px;
                            transition: transform 0.2s;
                            display: inline-block;
                        " onmouseover="this.style.transform='scale(1.2)'"
                        onmouseout="this.style.transform='scale(1)'">
                            <i class="fab fa-facebook"></i>
                        </a>
                        
                        <a href="https://www.tiktok.com/@dr.abdulhamidhamad" target="_blank" style="
                            color: #000;
                            font-size: 28px;
                            transition: transform 0.2s;
                            display: inline-block;
                        " onmouseover="this.style.transform='scale(1.2)'"
                        onmouseout="this.style.transform='scale(1)'">
                            <i class="fab fa-tiktok"></i>
                        </a>
                        
                        <a href="https://api.whatsapp.com/send/?phone=14039987830" target="_blank" style="
                            color: #25d366;
                            font-size: 28px;
                            transition: transform 0.2s;
                            display: inline-block;
                        " onmouseover="this.style.transform='scale(1.2)'"
                        onmouseout="this.style.transform='scale(1)'">
                            <i class="fab fa-whatsapp"></i>
                        </a>
                    </div>
                </div>
                                
                <!-- Close Button -->
                <button class="close-modal-btn" style="
                    background-color: #001553;
                    color: white;
                    border: none;
                    padding: 14px 40px;
                    border-radius: 8px;
                    font-size: 18px;
                    cursor: pointer;
                    margin: 0 auto;
                    transition: all 0.3s;
                    font-weight: 600;
                    box-shadow: 0 4px 15px rgba(0, 21, 83, 0.2);
                " onmouseover="this.style.backgroundColor='#00258F'; this.style.transform='translateY(-2px)'"
                onmouseout="this.style.backgroundColor='#001553'; this.style.transform='translateY(0)'">
                    شكرا لك
                </button>
            </div>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Attach event listeners
    document.querySelector('.close-modal')?.addEventListener('click', hideModal);
    document.querySelector('.close-modal-btn')?.addEventListener('click', hideModal);
    document.getElementById('success-modal')?.addEventListener('click', function (e) {
        if (e.target === this) hideModal();
    });
}

function showModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function hideModal() {
    document.getElementById('success-modal').classList.remove('d-flex');
    document.getElementById('success-modal').classList.add('d-none');
}


// Form validation and submission
function initForm() {
    const form = document.getElementById('webinar-form');
    if (!form) return;

    form.addEventListener('submit', handleFormSubmit);
    document.getElementById('name')?.addEventListener('blur', validateName);
    document.getElementById('phone')?.addEventListener('blur', validatePhone);
    document.getElementById('email')?.addEventListener('blur', validateEmail);
    document.getElementById('country')?.addEventListener('change', validatePhone);
}

async function validateName() {
    const nameInput = document.getElementById('name');
    const errorElement = document.getElementById('name-error');
    const name = nameInput.value.trim();
    const translations = await loadTranslations(currentLanguage);

    if (!name) {
        showError(errorElement, translations['error_name_required']);
        return false;
    }

    if (name.length < 3) {
        showError(errorElement, translations['error_name_min_length'] || 'Name must be at least 3 characters');
        return false;
    }

    hideError(errorElement);
    return true;
}

async function validatePhone() {
    const countrySelect = document.getElementById('country');
    const phoneInput = document.getElementById('phone');
    const errorElement = document.getElementById('phone-error');
    const countryCode = countrySelect.value;
    const phoneNumber = phoneInput.value.replace(/\D/g, '');
    const translations = await loadTranslations(currentLanguage);

    let isValid = true;
    let errorMessage = '';

    if (!phoneNumber) {
        isValid = false;
        errorMessage = translations['error_phone_required'];
    } else {
        switch (countryCode) {
            case 'EG':
                if (!/^(12|15|11|10)\d{8,9}$/.test(phoneNumber)) {
                    isValid = false;
                    errorMessage = translations['error_phone_egypt'] || 'Egyptian number must start with 11, 15, 12 or 10 and be 10-11 digits';
                }
                break;
            case 'SA':
            case 'AE':
                if (!/^5\d{8}$/.test(phoneNumber)) {
                    isValid = false;
                    errorMessage = translations['error_phone_gulf'] || 'Gulf number must start with 5 and be 9 digits';
                }
                break;
            case 'KW':
                if (!/^[569]\d{7}$/.test(phoneNumber)) {
                    isValid = false;
                    errorMessage = translations['error_phone_kuwait'] || 'Kuwaiti number must start with 5, 6 or 9 and be 8 digits';
                }
                break;
            case 'QA':
                if (!/^[3-7]\d{7}$/.test(phoneNumber)) {
                    isValid = false;
                    errorMessage = translations['error_phone_qatar'] || 'Qatari number must start with 3-7 and be 8 digits';
                }
                break;
        }
    }

    if (isValid) {
        const selectedCountry = CONFIG.COUNTRIES.find(c => c.code === countryCode);
        document.getElementById('full-phone-number').value = `+${selectedCountry.dialCode}${phoneNumber}`;
        hideError(errorElement);
    } else {
        showError(errorElement, errorMessage);
    }

    return isValid;
}

async function validateEmail() {
    const emailInput = document.getElementById('email');
    const errorElement = document.getElementById('email-error');
    const email = emailInput.value.trim();
    const translations = await loadTranslations(currentLanguage);

    if (email && !isValidEmail(email)) {
        showError(errorElement, translations['error_email_invalid']);
        return false;
    }

    hideError(errorElement);
    return true;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function showError(element, message) {
    if (!element) return;
    element.textContent = message;
    element.classList.remove('hidden');
}

function hideError(element) {
    if (!element) return;
    element.classList.add('hidden');
}

async function handleFormSubmit(e) {
    e.preventDefault();

    try {
        if (!validateName() || !validatePhone() || !validateEmail()) {
            throw new Error('الرجاء تصحيح الأخطاء في النموذج');
        }

        const now = Date.now();
        if (now - lastSubmissionTime < 5000) {
            throw new Error('الرجاء الانتظار 5 ثواني بين كل محاولة');
        }
        lastSubmissionTime = now;

        if (!window.grecaptcha || !grecaptcha.getResponse()) {
            throw new Error('الرجاء التحقق من أنك لست روبوت');
        }

        const formData = getFormData();
        const btn = e.target.querySelector('button[type="submit"]');
        const originalText = btn.textContent;

        btn.disabled = true;
        btn.innerHTML = '<span class="loading"></span> جاري التسجيل...';

        const result = await submitToGoogleAppsScript(formData);

        if (result.status !== 'success') {
            throw new Error(result.message || 'فشل في التسجيل');
        }

        handleSuccess();
        await sendWhatsAppMessage(formData.whatsapp, formData.name);
    } catch (error) {
        console.error('Form submission error:', error);
        alert(`حدث خطأ: ${error.message}`);
    } finally {
        const btn = e.target.querySelector('button[type="submit"]');
        if (btn) {
            btn.disabled = false;
            btn.textContent = 'سجل الآن';
        }
    }
}

function getFormData() {
    const countrySelect = document.getElementById('country');
    const selectedCountry = CONFIG.COUNTRIES.find(c => c.code === countrySelect.value);
    const phoneInput = document.getElementById('phone').value.replace(/\D/g, '');

    return {
        name: document.getElementById('name').value.trim(),
        whatsapp: `+${selectedCountry.dialCode}${phoneInput}`,
        email: document.getElementById('email')?.value.trim() || null,
        country: selectedCountry.name,
        website: CONFIG.WEBSITE_NAME,
        'g-recaptcha-response': grecaptcha.getResponse()
    };
}

async function submitToGoogleAppsScript(data) {
    try {
        const formData = new URLSearchParams();
        for (const key in data) {
            if (data[key]) formData.append(key, data[key]);
        }

        const response = await fetch(CONFIG.APPS_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString()
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseText = await response.text();
        if (!responseText) {
            throw new Error('الخادم لم يرد بأي بيانات');
        }

        return JSON.parse(responseText);
    } catch (error) {
        console.error('Error submitting to Google Apps Script:', error);
        return {
            status: 'error',
            message: error.message || 'فشل الاتصال بالخادم'
        };
    }
}

function handleSuccess() {
    document.getElementById('success-modal').classList.remove('d-none');
    document.getElementById('success-modal').classList.add('d-flex');
}

async function sendWhatsAppMessage(number, name) {
    try {
        const message = WHATSAPP_MESSAGE_TEMPLATE
            .replace('{name}', name)
            .replace('{webinar_title}', CONFIG.WEBINAR_TITLE)
            .replace('{webinar_date}', CONFIG.WEBINAR_DATE)
            .replace('{webinar_time}', CONFIG.WEBINAR_TIME)
            .replace('{webinar_link}', CONFIG.WEBINAR_LINK);

        const cleanNumber = number.replace(/\D/g, '');
        const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, '_blank');
    } catch (error) {
        console.error('Failed to send WhatsApp message:', error);
    }
}