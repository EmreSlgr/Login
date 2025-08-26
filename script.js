const container = document.getElementById('container');
const toggleButton = document.getElementById('toggleButton');

// Toggle screen and button text
toggleButton.addEventListener('click', () => {
  if(toggleButton.textContent === "Kayıt Ol") {
    container.classList.add('active');
    toggleButton.textContent = "Giriş Yap";
  } else {
    container.classList.remove('active');
    toggleButton.textContent = "Kayıt Ol";
  }
});

// Password toggle
document.querySelectorAll('.toggle-password').forEach(icon => {
  icon.addEventListener('click', () => {
    const input = icon.previousElementSibling;
    if(input.type === 'password'){
      input.type = 'text';
      icon.classList.replace('fa-eye','fa-eye-slash');
    } else {
      input.type = 'password';
      icon.classList.replace('fa-eye-slash','fa-eye');
    }
  });
});

// Form validation
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('input').forEach(input => {
      if(input.value.trim() === '') {
        valid = false;
        input.style.borderColor = 'red';
      } else {
        input.style.borderColor = '#ddd';
      }
    });
    if(valid) {
      alert("Form başarıyla gönderildi!");
      form.reset();
      // Şifre gücü barını sıfırla
      const bar = form.querySelector('.strength-bar');
      if(bar) bar.style.width = '0%';
      const liItems = form.querySelectorAll('.password-requirements li');
      liItems.forEach(li => li.classList.remove('valid'));
    } else {
      alert("Lütfen tüm alanları doldurun!");
    }
  });
});

// Şifre gücü ve kriterleri
const passwordInput = document.getElementById('signUpPassword');
if(passwordInput){
  const strengthBar = document.querySelector('.strength-bar');
  const strengthText = document.querySelector('.strength-text');

  const lengthReq = document.getElementById('length');
  const uppercaseReq = document.getElementById('uppercase');
  const lowercaseReq = document.getElementById('lowercase');
  const numberReq = document.getElementById('number');
  const specialReq = document.getElementById('special');

  passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    let strength = 0;

    // Uzunluk
    if(val.length >= 6){ lengthReq.classList.add('valid'); lengthReq.classList.remove('invalid'); strength++; }
    else{ lengthReq.classList.add('invalid'); lengthReq.classList.remove('valid'); }

    // Büyük harf
    if(/[A-Z]/.test(val)){ uppercaseReq.classList.add('valid'); uppercaseReq.classList.remove('invalid'); strength++; }
    else{ uppercaseReq.classList.add('invalid'); uppercaseReq.classList.remove('valid'); }

    // Küçük harf
    if(/[a-z]/.test(val)){ lowercaseReq.classList.add('valid'); lowercaseReq.classList.remove('invalid'); strength++; }
    else{ lowercaseReq.classList.add('invalid'); lowercaseReq.classList.remove('valid'); }

    // Rakam
    if(/[0-9]/.test(val)){ numberReq.classList.add('valid'); numberReq.classList.remove('invalid'); strength++; }
    else{ numberReq.classList.add('invalid'); numberReq.classList.remove('valid'); }

    // Özel karakter
    if(/[!@#$%^&*()?]/.test(val)){ specialReq.classList.add('valid'); specialReq.classList.remove('invalid'); strength++; }
    else{ specialReq.classList.add('invalid'); specialReq.classList.remove('valid'); }

    // Güç barı güncelle
    const percent = (strength / 5) * 100;
    strengthBar.style.width = percent + '%';

    // Güç metni
    if(strength <= 1) strengthText.textContent = "Çok Zayıf";
    else if(strength === 2) strengthText.textContent = "Zayıf";
    else if(strength === 3) strengthText.textContent = "Orta";
    else if(strength === 4) strengthText.textContent = "Güçlü";
    else if(strength === 5) strengthText.textContent = "Çok Güçlü";
  });
}
