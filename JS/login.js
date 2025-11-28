document.addEventListener('DOMContentLoaded', function() {
            // Tab switching
            const loginTab = document.getElementById('login-tab');
            const registerTab = document.getElementById('register-tab');
            const loginForm = document.getElementById('login-form');
            const registerForm = document.getElementById('register-form');
            const switchToRegister = document.getElementById('switchToRegister');
            const switchToLogin = document.getElementById('switchToLogin');
            const registerSuccess = document.getElementById('register-success');
            
            function showLoginForm() {
                loginTab.classList.add('active');
                registerTab.classList.remove('active');
                loginForm.classList.add('active');
                registerForm.classList.remove('active');
                registerSuccess.style.display = 'none';
                
                // Reset step indicators
                document.getElementById('step1').classList.add('active');
                document.getElementById('step2').classList.remove('active');
                document.getElementById('step3').classList.remove('active');
                document.getElementById('step1').classList.remove('completed');
                document.getElementById('step2').classList.remove('completed');
                document.getElementById('step1').querySelector('.step-line').classList.remove('active');
                document.getElementById('step2').querySelector('.step-line').classList.remove('active');
            }
            
            function showRegisterForm() {
                loginTab.classList.remove('active');
                registerTab.classList.add('active');
                loginForm.classList.remove('active');
                registerForm.classList.add('active');
                registerSuccess.style.display = 'none';
                
                // Reset step indicators
                document.getElementById('step1').classList.add('active');
                document.getElementById('step2').classList.remove('active');
                document.getElementById('step3').classList.remove('active');
                document.getElementById('step1').classList.remove('completed');
                document.getElementById('step2').classList.remove('completed');
                document.getElementById('step1').querySelector('.step-line').classList.remove('active');
                document.getElementById('step2').querySelector('.step-line').classList.remove('active');
            }
            
            loginTab.addEventListener('click', showLoginForm);
            registerTab.addEventListener('click', showRegisterForm);
            switchToRegister.addEventListener('click', showRegisterForm);
            switchToLogin.addEventListener('click', showLoginForm);
            
            // Password toggle
            const loginPasswordToggle = document.getElementById('loginPasswordToggle');
            const loginPassword = document.getElementById('loginPassword');
            const registerPasswordToggle = document.getElementById('registerPasswordToggle');
            const registerPassword = document.getElementById('registerPassword');
            const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
            const confirmPassword = document.getElementById('confirmPassword');
            
            function togglePasswordVisibility(input, toggleIcon) {
                if (input.type === 'password') {
                    input.type = 'text';
                    toggleIcon.classList.remove('bi-eye');
                    toggleIcon.classList.add('bi-eye-slash');
                } else {
                    input.type = 'password';
                    toggleIcon.classList.remove('bi-eye-slash');
                    toggleIcon.classList.add('bi-eye');
                }
            }
            
            loginPasswordToggle.addEventListener('click', function() {
                togglePasswordVisibility(loginPassword, this.querySelector('i'));
            });
            
            registerPasswordToggle.addEventListener('click', function() {
                togglePasswordVisibility(registerPassword, this.querySelector('i'));
            });
            
            confirmPasswordToggle.addEventListener('click', function() {
                togglePasswordVisibility(confirmPassword, this.querySelector('i'));
            });
            
            // Form submission
            const loginFormElement = document.getElementById('loginForm');
            const registerFormElement = document.getElementById('registerForm');
            const loginAlert = document.getElementById('login-alert');
            const registerAlert = document.getElementById('register-alert');
            
            loginFormElement.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                
                // Simulação de login (substituir por lógica real)
                if (email && password) {
                    // Login bem-sucedido
                    console.log('Login bem-sucedido');
                    
                    // Mostrar toast de sucesso
                    const toastContainer = document.createElement('div');
                    toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
                    toastContainer.style.zIndex = '11';
                    
                    toastContainer.innerHTML = `
                        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                            <div class="toast-header bg-success text-white">
                                <i class="bi bi-check-circle me-2"></i>
                                <strong class="me-auto">Sucesso</strong>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                            <div class="toast-body">
                                Login realizado com sucesso!
                            </div>
                        </div>
                    `;
                    
                    document.body.appendChild(toastContainer);
                    
                    setTimeout(() => {
                        toastContainer.remove();
                    }, 3000);
                } else {
                    // Login falhou
                    loginAlert.textContent = 'Por favor, preencha todos os campos.';
                    loginAlert.classList.add('show');
                    
                    setTimeout(() => {
                        loginAlert.classList.remove('show');
                    }, 3000);
                }
            });
            
            registerFormElement.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const firstName = document.getElementById('firstName').value;
                const lastName = document.getElementById('lastName').value;
                const email = document.getElementById('registerEmail').value;
                const phone = document.getElementById('phone').value;
                const birthDate = document.getElementById('birthDate').value;
                const educationLevel = document.getElementById('educationLevel').value;
                const password = document.getElementById('registerPassword').value;
                const confirmPassword = document.getElementById('confirmPassword').value;
                const termsCheck = document.getElementById('termsCheck').checked;
                
                // Validações
                if (!firstName || !lastName || !email || !phone || !birthDate || !educationLevel || !password || !confirmPassword) {
                    registerAlert.textContent = 'Por favor, preencha todos os campos.';
                    registerAlert.classList.add('show');
                    
                    setTimeout(() => {
                        registerAlert.classList.remove('show');
                    }, 3000);
                    return;
                }
                
                if (password !== confirmPassword) {
                    registerAlert.textContent = 'As senhas não coincidem.';
                    registerAlert.classList.add('show');
                    
                    setTimeout(() => {
                        registerAlert.classList.remove('show');
                    }, 3000);
                    return;
                }
                
                if (!termsCheck) {
                    registerAlert.textContent = 'Você deve concordar com os termos de serviço.';
                    registerAlert.classList.add('show');
                    
                    setTimeout(() => {
                        registerAlert.classList.remove('show');
                    }, 3000);
                    return;
                }
                
                // Simulação de cadastro (substituir por lógica real)
                console.log('Cadastro bem-sucedido');
                
                // Mostrar mensagem de sucesso
                registerForm.classList.remove('active');
                registerSuccess.style.display = 'block';
            });
            
            // Esqueci minha senha
            const forgotPassword = document.getElementById('forgotPassword');
            const resetPasswordModal = new bootstrap.Modal(document.getElementById('resetPasswordModal'));
            
            forgotPassword.addEventListener('click', function(e) {
                e.preventDefault();
                resetPasswordModal.show();
            });
            
            // Form submission for password reset
            const resetPasswordForm = document.getElementById('resetPasswordForm');
            
            resetPasswordForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('resetEmail').value;
                
                if (email) {
                    // Simulação de envio de email de redefinição (substituir por lógica real)
                    console.log('Email de redefinição enviado para:', email);
                    
                    // Fechar modal
                    resetPasswordModal.hide();
                    
                    // Mostrar toast de sucesso
                    const toastContainer = document.createElement('div');
                    toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
                    toastContainer.style.zIndex = '11';
                    
                    toastContainer.innerHTML = `
                        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                            <div class="toast-header bg-success text-white">
                                <i class="bi bi-check-circle me-2"></i>
                                <strong class="me-auto">Sucesso</strong>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                            <div class="toast-body">
                                Email de redefinição enviado com sucesso! Verifique sua caixa de entrada.
                            </div>
                        </div>
                    `;
                    
                    document.body.appendChild(toastContainer);
                    
                    setTimeout(() => {
                        toastContainer.remove();
                    }, 3000);
                }
            });
            
            // Go to login from success page
            const goToLoginBtn = document.getElementById('goToLogin');
            
            goToLoginBtn.addEventListener('click', function() {
                showLoginForm();
                // Limpar formulário de registro
                document.getElementById('registerForm').reset();
            });
            
            // Password strength indicator
            const passwordStrengthBar = document.getElementById('passwordStrengthBar');
            const passwordStrengthText = document.getElementById('passwordStrengthText');
            const registerPasswordInput = document.getElementById('registerPassword');
            
            registerPasswordInput.addEventListener('input', function() {
                const password = this.value;
                let strength = 0;
                let strengthText = '';
                let strengthColor = '';
                
                if (password.length >= 8) strength += 1;
                if (password.match(/[a-z]+/)) strength += 1;
                if (password.match(/[A-Z]+/)) strength += 1;
                if (password.match(/[0-9]+/)) strength += 1;
                if (password.match(/[^a-zA-Z0-9]+/)) strength += 1;
                
                switch (strength) {
                    case 0:
                        strengthText = 'Senha Fraca';
                        strengthColor = '#dc3545';
                        break;
                    case 1:
                        strengthText = 'Senha Fraca';
                        strengthColor = '#dc3545';
                        break;
                    case 2:
                        strengthText = 'Senha Média';
                        strengthColor = '#ffc107';
                        break;
                    case 3:
                        strengthText = 'Senha Média';
                        strengthColor = '#ffc107';
                        break;
                    case 4:
                        strengthText = 'Senha Forte';
                        strengthColor = '#28a745';
                        break;
                    case 5:
                        strengthText = 'Senha Muito Forte';
                        strengthColor = '#28a745';
                        break;
                }
                
                passwordStrengthBar.style.width = (strength * 20) + '%';
                passwordStrengthBar.style.backgroundColor = strengthColor;
                passwordStrengthText.textContent = strengthText;
            });
            
            // Validação em tempo real dos campos
            const formInputs = document.querySelectorAll('.form-control, .form-select');
            
            formInputs.forEach(input => {
                input.addEventListener('input', function() {
                    if (this.value) {
                        this.classList.add('input-valid');
                        this.classList.remove('input-invalid');
                    } else {
                        this.classList.remove('input-valid');
                        this.classList.remove('input-invalid');
                    }
                });
                
                input.addEventListener('blur', function() {
                    if (this.required && !this.value) {
                        this.classList.add('input-invalid');
                        this.classList.remove('input-valid');
                    }
                });
            });
            
            // Adicionar ícones aos campos de formulário
            const inputGroups = document.querySelectorAll('.input-group-text');
            
            inputGroups.forEach(group => {
                const icon = group.querySelector('i');
                if (icon) {
                    group.style.width = '40px';
                    group.style.justifyContent = 'center';
                }
            });
        });