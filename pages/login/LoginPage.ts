import { BasePage } from "../BasePage";
import { Page, Locator, expect } from "@playwright/test";

export class LoginPage extends BasePage {
    readonly page: Page;
    private readonly _logo: Locator;
    private readonly _form: Locator;
    private readonly _emailField: Locator;
    private readonly _passwordField: Locator;
    private readonly _passwordEye: Locator;
    private readonly _rememberMeCheckbox: Locator;
    private readonly _forgotYourPasswordLink: Locator;
    private readonly _loginButton: Locator;
    private readonly _registerLink: Locator;
    private readonly _privacyPolicyLink: Locator;
    private readonly _termsOfServiceLink: Locator;
    private readonly _languagesList: Locator;
    private readonly _matWarn: Locator;
    private readonly _recoveryEmailField: Locator;
    private readonly _goToAuthorizationButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this._logo = page.locator('mat-icon[svgicon="login-logo-desktop"]');
        this._form = page.locator('form');
        this._emailField = this.form.locator('.mat-mdc-input-element').nth(0);
        this._passwordField = this.form.locator('.mat-mdc-input-element').nth(1);
        this._passwordEye = this.form.locator('.mat-icon');
        this._rememberMeCheckbox = this.form.locator('.mdc-checkbox__native-control');
        this._forgotYourPasswordLink = this.form.locator('span[routerlink="/reset_password"]');
        this._loginButton = this.form.locator('.mdc-button');
        this._registerLink = this.form.locator('span[routerlink="/sign_up"]');
        this._privacyPolicyLink = page.locator('a[href="https://policies.google.com/privacy?hl=en"]');
        this._termsOfServiceLink = page.locator('a[href="https://policies.google.com/terms?hl=en"]');
        this._languagesList = page.locator('.language-dd');
        this._matWarn = this.form.locator('button .mat-warn');
        this._recoveryEmailField = this.page.locator('input.mat-mdc-input-element');
        this._goToAuthorizationButton = page.getByText('Go to authorization');
    }

    get logo(): Locator {
        return this._logo;
    }

    get form(): Locator {
        return this._form;
    }

    get emailField(): Locator {
        return this._emailField;
    }

    get passwordField(): Locator {
        return this._passwordField;
    }

    get passwordEye(): Locator {
        return this._passwordEye;
    }

    get rememberMeCheckbox(): Locator {
        return this._rememberMeCheckbox;
    }

    get forgotYourPasswordLink(): Locator {
        return this._forgotYourPasswordLink;
    }

    get loginButton(): Locator {
        return this._loginButton;
    }

    get registerLink(): Locator {
        return this._registerLink;
    }

    get privacyPolicyLink(): Locator {
        return this._privacyPolicyLink;
    }

    get termsOfServiceLink(): Locator {
        return this._termsOfServiceLink;
    }

    get languagesList(): Locator {
        return this._languagesList;
    }

    get matWarn(): Locator {
        return this._matWarn;
    }

    get recoveryEmailField(): Locator {
        return this._recoveryEmailField;
    }

    get goToAuthorizationButton(): Locator {
        return this._goToAuthorizationButton;
    }

    async auth(user: object) {
        await this.emailField.fill(user['login']);
        await this.passwordField.fill(user['password']);
        await this.passwordEye.hover();
        expect(this.page.getByText(user['login'])).toBeDefined();
        expect(this.page.getByText(user['password'])).toBeDefined();
        await this.loginButton.click();
    }


}