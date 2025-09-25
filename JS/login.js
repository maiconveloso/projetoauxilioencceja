// Sistema de Banco de Dados Simulado
class Database {
    constructor() {
        this.storage = localStorage;
        this.usersKey = 'encceja_users';
        this.initializeDatabase();
    }
    initializeDatabase() {

        if (!this.storage.getItem(this.usersKey)) {
            this.storage.setItem(this.usersKey, JSON.stringify([]));
        }
    }

    getUsers() {
        return JSON.parse(this.storage.getItem(this.usersKey) || '[]');
    }

    saveUsers(users) {
        this.storage.setItem(this.usersKey, JSON.stringify(users));
    }

    findUserByEmail(email) {
        const users = this.getUsers();
        return users.find(user => user.email === email);
    }

    findUserByCPF(cpf) {
        const users = this.getUsers();
        return users.find(user => user.cpf === cpf);
    }

    createUser(userData) {
        const users = this.getUsers();
        const newUser = {
            id: Date.now(),
            ...userData,
            createdAt: new Date().toISOString(),
            lastLogin: null
        };
        users.push(newUser);
        this.saveUsers(users);
        return newUser;
    }

    updateUserLogin(userId) {
        const users = this.getUsers();
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex !== -1) {
            users[userIndex].lastLogin = new Date().toISOString();
            this.saveUsers(users);
        }
    }

    validateLogin(identifier, password) {
        const users = this.getUsers();
        const user = users.find(u =>
            (u.email === identifier || u.cpf === identifier.replace(/\D/g, '')) &&
            u.password === password
        );
        return user;
    }

    generateResetToken(email) {

        // Em um sistema real, isso geraria um token único e o enviaria por e-mail
        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const resetTokens = JSON.parse(localStorage.getItem('passwordResetTokens') || '{}');
        resetTokens[email] = {
            token: token,
            expires: new Date(Date.now() + 3600000).toISOString() // 1 hora de validade
        };
        localStorage.setItem('passwordResetTokens', JSON.stringify(resetTokens));
        return token;
    }
}

// Inicialização do banco de dados
const db = new Database();

// Gerenciamento de UI
class AuthManager {
    constructor() {
        this.currentTab = 'login';
        this.isAnimating = false;
        this.initializeEventListeners();
        this.setupMasks();
        this.loadRememberedCredentials();
    }

    initializeEventListeners() {

        // Tabs
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                if (!this.isAnimating) {
                    this.switchTab(tab.dataset.tab);
                }
            });
        });

        // Form submission
        document.getElementById('authForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        // Toggle password visibility
        document.getElementById('togglePassword').addEventListener('click', () => {
            this.togglePasswordVisibility('password', 'togglePassword');
        });

        document.getElementById('toggleConfirmPassword').addEventListener('click', () => {
            this.togglePasswordVisibility('confirmPassword', 'toggleConfirmPassword');
        });

        // Forgot password
        document.getElementById('forgotPassword').addEventListener('click', (e) => {
            e.preventDefault();
            this.showForgotPasswordModal();
        });

        // Remember me functionality
        document.getElementById('rememberMe').addEventListener('change', (e) => {
            if (e.target.checked) {
                const loginValue = document.getElementById('login').value.trim();
                if (loginValue) {
                    localStorage.setItem('rememberedLogin', loginValue);
                }
            } else {
                localStorage.removeItem('rememberedLogin');
            }
        });

        // Real-time validation
        this.setupRealTimeValidation();

        // Forgot password form submission
        document.getElementById('forgotPasswordForm')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleForgotPassword();
        });
    }

    loadRememberedCredentials() {
        const rememberedLogin = localStorage.getItem('rememberedLogin');
        if (rememberedLogin) {
            document.getElementById('login').value = rememberedLogin;
            document.getElementById('rememberMe').checked = true;
        }
    }

    setupMasks() {
        // CPF Mask
        const cpfInput = document.getElementById('cpf');
        if (cpfInput) {
            cpfInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
                e.target.value = value;
            });
        }

        // Phone Mask
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                e.target.value = value;
            });
        }
    }

    setupRealTimeValidation() {
        const inputs = document.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.clearFieldError(input);
                }
            });
        });
    }

    switchTab(tab) {
        if (this.currentTab === tab || this.isAnimating) return;
        this.isAnimating = true;
        const formContent = document.querySelector('.form-content');
        const isLoginToRegister = this.currentTab === 'login' && tab === 'register';

        // Adiciona classe de animação de saída
        if (isLoginToRegister) {
            formContent.classList.add('slide-out-left');
        } else {
            formContent.classList.add('slide-out-right');
        }

        // Espera a animação de saída completar
        setTimeout(() => {

            // Atualiza o conteúdo
            this.currentTab = tab;

            // Update tabs
            document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
            document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

            // Update form
            if (tab === 'login') {
                document.getElementById('formTitle').textContent = 'Iniciar Sessão';
                document.getElementById('formSubtitle').textContent = 'Entre com suas credenciais para continuar';
                document.getElementById('btnText').textContent = 'Entrar';
                document.getElementById('registerFields').classList.add('hidden');
                document.getElementById('confirmPasswordGroup').classList.add('hidden');
                document.getElementById('loginGroup').classList.remove('hidden');
                document.querySelector('.remember-forgot-container').style.display = 'flex';

            } else {

                document.getElementById('formTitle').textContent = 'Criar Conta';
                document.getElementById('formSubtitle').textContent = 'Preencha os dados para se cadastrar';
                document.getElementById('btnText').textContent = 'Cadastrar';
                document.getElementById('registerFields').classList.remove('hidden');
                document.getElementById('confirmPasswordGroup').classList.remove('hidden');
                document.getElementById('loginGroup').classList.add('hidden');
                document.querySelector('.remember-forgot-container').style.display = 'none';
            }

            // Remove classes de animação de saída
            formContent.classList.remove('slide-out-left', 'slide-out-right');

            // Adiciona classe de animação de entrada
            if (isLoginToRegister) {
                formContent.classList.add('slide-in-right');
            } else {
                formContent.classList.add('slide-in-left');
            }

            // Remove classes de animação de entrada após a conclusão
            setTimeout(() => {
                formContent.classList.remove('slide-in-left', 'slide-in-right');
                this.isAnimating = false;
            }, 400);

            // Clear form
            this.clearForm();
        }, 200);
    }

    togglePasswordVisibility(inputId, iconId) {
        const input = document.getElementById(inputId);
        const icon = document.getElementById(iconId);
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('bi-eye-slash');
            icon.classList.add('bi-eye');
        } else {
            input.type = 'password';
            icon.classList.remove('bi-eye');
            icon.classList.add('bi-eye-slash');
        }
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldId = field.id;
        let isValid = true;
        let errorMessage = '';
        switch (fieldId) {
            case 'fullName':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Nome é obrigatório';
                } else if (value.length < 3) {
                    isValid = false;
                    errorMessage = 'Nome deve ter pelo menos 3 caracteres';
                }
                break;
            case 'cpf':
                const cpfClean = value.replace(/\D/g, '');
                if (!cpfClean) {
                    isValid = false;
                    errorMessage = 'CPF é obrigatório';
                } else if (cpfClean.length !== 11 || !this.validateCPF(cpfClean)) {
                    isValid = false;
                    errorMessage = 'CPF inválido';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    isValid = false;
                    errorMessage = 'E-mail é obrigatório';
                } else if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'E-mail inválido';
                }
                break;
            case 'phone':
                const phoneClean = value.replace(/\D/g, '');
                if (!phoneClean) {
                    isValid = false;
                    errorMessage = 'Telefone é obrigatório';
                } else if (phoneClean.length < 10 || phoneClean.length > 11) {
                    isValid = false;
                    errorMessage = 'Telefone inválido';
                }
                break;
            case 'login':
                if (!value) {
                    isValid = false;
                    errorMessage = 'E-mail ou CPF é obrigatório';
                }
                break;
            case 'password':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Senha é obrigatória';
                } else if (value.length < 6) {
                    isValid = false;
                    errorMessage = 'Senha deve ter pelo menos 6 caracteres';
                }
                break;
            case 'confirmPassword':
                const password = document.getElementById('password').value;
                if (!value) {
                    isValid = false;
                    errorMessage = 'Confirmação de senha é obrigatória';
                } else if (value !== password) {
                    isValid = false;
                    errorMessage = 'Senhas não coincidem';
                }
                break;
            case 'forgotLogin':
                if (!value) {
                    isValid = false;
                    errorMessage = 'E-mail ou CPF é obrigatório';
                }
                break;
        }
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }
        return isValid;
    }

    validateCPF(cpf) {
        let sum = 0;
        let remainder;
        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;
        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11))) return false;
        return true;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        const errorElement = document.getElementById(field.id + 'Error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = document.getElementById(field.id + 'Error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    validateForm() {
        let isValid = true;
        const fields = this.currentTab === 'login'
            ? ['login', 'password']
            : ['fullName', 'cpf', 'email', 'phone', 'password', 'confirmPassword'];
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field && !field.parentElement.classList.contains('hidden')) {
                if (!this.validateField(field)) {
                    isValid = false;
                }
            }
        });
        return isValid;
    }

    async handleFormSubmit() {
        if (!this.validateForm()) {
            this.showToast('error', 'Por favor, corrija os erros no formulário');
            return;
        }
        this.setLoading(true);

        // Simular delay de rede
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
            if (this.currentTab === 'login') {
                await this.handleLogin();
            } else {
                await this.handleRegister();
            }
        } catch (error) {
            this.showToast('error', error.message);
        } finally {
            this.setLoading(false);
        }
    }

    async handleLogin() {
        const login = document.getElementById('login').value.trim();
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        const user = db.validateLogin(login, password);
        if (user) {

            // Salvar credenciais se "lembrar-me" estiver marcado
            if (rememberMe) {
                localStorage.setItem('rememberedLogin', login);
            } else {
                localStorage.removeItem('rememberedLogin');
            }

            db.updateUserLogin(user.id);
            this.showToast('success', 'Login realizado com sucesso!');

            // Simular redirecionamento após login
            setTimeout(() => {
                this.showToast('info', 'Redirecionando para o painel...');

                // Em uma aplicação real, aqui redirecionaria para a página principal
            }, 1500);
        } else {
            throw new Error('E-mail/CPF ou senha incorretos');
        }
    }

    async handleRegister() {
        const fullName = document.getElementById('fullName').value.trim();
        const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.replace(/\D/g, '');
        const password = document.getElementById('password').value;

        // Verificar se usuário já existe
        if (db.findUserByEmail(email)) {
            throw new Error('Este e-mail já está cadastrado');
        }

        if (db.findUserByCPF(cpf)) {
            throw new Error('Este CPF já está cadastrado');
        }

        // Criar usuário
        const userData = {
            fullName,
            cpf,
            email,
            phone,
            password // Em produção, usar hash de senha
        };

        const newUser = db.createUser(userData);
        this.showToast('success', 'Cadastro realizado com sucesso!');

        // Mudar para login após cadastro
        setTimeout(() => {
            this.switchTab('login');
            document.getElementById('login').value = email;
            this.showToast('info', 'Agora faça login com suas credenciais');
        }, 1500);
    }

    setLoading(isLoading) {
        const btn = document.getElementById('submitBtn');
        const btnText = document.getElementById('btnText');
        const spinner = document.getElementById('loadingSpinner');
        if (isLoading) {
            btn.disabled = true;
            btnText.style.display = 'none';
            spinner.style.display = 'block';
        } else {
            btn.disabled = false;
            btnText.style.display = 'inline';
            spinner.style.display = 'none';
        }
    }

    clearForm() {
        document.getElementById('authForm').reset();
        document.querySelectorAll('.form-control').forEach(field => {
            this.clearFieldError(field);
        });

        // Carregar credenciais salvas se estiver na aba de login
        if (this.currentTab === 'login') {
            this.loadRememberedCredentials();
        }
    }

    showToast(type, message) {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        const icon = type === 'success' ? 'bi-check-circle-fill' :
            type === 'error' ? 'bi-x-circle-fill' :
                'bi-info-circle-fill';
        toast.innerHTML = `
            <i class="bi ${icon}"></i>
            <span>${message}</span>
        `;

        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    showForgotPasswordModal() {
        const modal = new bootstrap.Modal(document.getElementById('forgotPasswordModal'));
        modal.show();

        // Limpar o formulário e mensagens de erro ao abrir o modal
        document.getElementById('forgotPasswordForm').reset();
        document.getElementById('forgotLogin').classList.remove('error');
        document.getElementById('forgotLoginError').style.display = 'none';
        document.getElementById('successInstructions').style.display = 'none';
    }

    async handleForgotPassword() {
        const login = document.getElementById('forgotLogin').value.trim();
        let isValid = true;

        // Validar campo
        if (!this.validateField(document.getElementById('forgotLogin'))) {
            isValid = false;
        }

        if (!isValid) return;

        // Exibir loading
        document.getElementById('forgotPasswordBtn').disabled = true;
        document.getElementById('forgotBtnText').style.display = 'none';
        document.getElementById('forgotLoadingSpinner').style.display = 'block';

        // Simular envio
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Verificar se o usuário existe
        const user = db.findUserByEmail(login) || db.findUserByCPF(login.replace(/\D/g, ''));

        // Resetar estado do botão
        document.getElementById('forgotPasswordBtn').disabled = false;
        document.getElementById('forgotBtnText').style.display = 'inline';
        document.getElementById('forgotLoadingSpinner').style.display = 'none';

        if (user) {

            // Gerar token de redefinição de senha
            db.generateResetToken(user.email);

            // Exibir mensagem de sucesso
            document.getElementById('successInstructions').style.display = 'block';
            document.getElementById('forgotPasswordForm').style.display = 'none';

            // Fechar o modal após alguns segundos
            setTimeout(() => {
                const modal = bootstrap.Modal.getInstance(document.getElementById('forgotPasswordModal'));
                modal.hide();

                // Resetar o modal para o próximo uso
                setTimeout(() => {
                    document.getElementById('forgotPasswordForm').style.display = 'block';
                    document.getElementById('successInstructions').style.display = 'none';
                    document.getElementById('forgotPasswordForm').reset();
                }, 500);
            }, 5000);

        } else {

            document.getElementById('forgotLogin').classList.add('error');
            document.getElementById('forgotLoginError').textContent = 'Nenhuma conta encontrada com este e-mail ou CPF';
            document.getElementById('forgotLoginError').style.display = 'block';
        }
    }
}

// Inicializar o gerenciador de autenticação
const authManager = new AuthManager();

// Adicionar alguns usuários de exemplo para demonstração
if (db.getUsers().length === 0) {
    db.createUser({
        fullName: 'João Silva',
        cpf: '12345678909',
        email: 'joao.silva@example.com',
        phone: '11987654321',
        password: 'senha123'
    });

    db.createUser({
        fullName: 'Maria Santos',
        cpf: '98765432100',
        email: 'maria.santos@example.com',
        phone: '21987654321',
        password: 'senha456'
    });
}