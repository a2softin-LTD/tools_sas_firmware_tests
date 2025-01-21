import {  Locator, type Page } from "@playwright/test";
import { TITLE_UPDATE_FIRMWARE_VERSION } from "../utils/Constants";

export class BasePage {
    readonly page: Page;
    // BUTTONS
    private readonly _saveButton: Locator;
    private readonly _change_Button: Locator;
    private readonly _submitButton: Locator;
    private readonly _submitModalButton: Locator;
    private readonly _deleteButton: Locator;
    private readonly _deleteUserButton: Locator;
    private readonly _addButton: Locator;
    private readonly _deleteNotExactButton: Locator;
    private readonly _closeWindowButton: Locator;
    private readonly _disableButton: Locator;
    private readonly _enableButton: Locator;
    private readonly _enabledButton: Locator;
    private readonly _nextButton: Locator;
    private readonly _yesButton: Locator;
    private readonly _noButton: Locator;
    private readonly _okButton: Locator;
    private readonly _backButton: Locator;
    private readonly _onButton: Locator;
    private readonly _offButton: Locator;
    private readonly _editButton: Locator;
    private readonly _exportButton: Locator;
    private readonly _exportSensorsButton: Locator;
    private readonly _changeButton: Locator;
    private readonly _closeButton: Locator;
    private readonly _applyButton: Locator;
    private readonly _connectButton: Locator;
    private readonly _sendButton: Locator;
    private readonly _addCountryButton: Locator;
    private readonly _resendEmailButton: Locator;
    private readonly _searchButton: Locator;
    private readonly _clearButton: Locator;
    private readonly _saveInXLSButton: Locator;
    // FIELDS
    private readonly _inputFirstField: Locator;
    private readonly _inputSecondField: Locator;
    private readonly _inputThirdField: Locator;
    private readonly _inputFourthField: Locator;
    private readonly _inputFifthField: Locator;
    private readonly _inputSixthField: Locator;
    private readonly _inputSeventhField: Locator;
    private readonly _selectFirstField: Locator;
    private readonly _selectSecondField: Locator;
    private readonly _selectThirdField: Locator;
    private readonly _inputField: Locator;
    private readonly _searchField: Locator;
    // ICONS
    private readonly _trashIcon: Locator;
    private readonly _banIcon: Locator;
    private readonly _informationIcon: Locator
    private readonly _updateFirmwareIcon: Locator
    private readonly _adsIcon: Locator
    private readonly _editIcon: Locator
    private readonly _connectionOnlineIcon: Locator
    private readonly _tamperOpenIcon: Locator

    // SECTIONS
    private readonly _panels: Locator;
    private readonly _company: Locator;
    private readonly _companies: Locator;
    private readonly _dealers: Locator;
    private readonly _feedback: Locator;
    private readonly _permissions: Locator;
    private readonly _routing: Locator;
    private readonly _requests: Locator;
    private readonly _history: Locator;
    private readonly _automation: Locator;
    private readonly _employees: Locator;
    private readonly _groupsOfCompanies: Locator;
    private readonly _system: Locator;
    private readonly _users: Locator;
    private readonly _groups: Locator;
    private readonly _troubles: Locator;
    private readonly _myProfile: Locator;
    // OTHERS
    private readonly _pageTitle: Locator;
    private readonly _rowBlock: Locator;
    private readonly _notExistEntity: Locator;
    private readonly _existEntity: Locator;
    private readonly _entityBlock: Locator;
    private readonly _dateBlock: Locator;
    private readonly _entityText: Locator;
    private readonly _entityText1: Locator;

    constructor(page: Page) {
        this.page = page;

        // BUTTONS
        this._saveButton = page.getByText('Save',{ exact: true });
        this._change_Button = page.getByText('Change',{ exact: true });
        this._deleteButton = page.getByRole('button', { name: 'Delete' });
        this._deleteUserButton = page.getByText('Delete user');
        this._addButton = page.getByRole('button', { name: 'Add' });
        this._submitModalButton = (this.page.locator('.main__modal.active')).locator(this.page.getByText('Submit'));
        this._submitButton = page.getByText('Submit');
        this._closeWindowButton = page.locator('.button__cancel-icon');
        this._searchButton = page.getByText('Search',{ exact: true });
        this._closeButton = page.getByRole('button', { name: 'Close' });
        this._disableButton = (this.page.locator('.main__modal.active')).locator(this.page.getByText('Disable')).
        or((this.page.locator('.main__modal.active')).locator(this.page.getByText('Disabled')));
        this._enableButton = ((this.page.locator('.main__modal.active')).locator(this.page.getByText('Enable')));
        this._enabledButton = ((this.page.locator('.main__modal.active')).locator(this.page.getByText('Enabled')));

        this._saveInXLSButton = page.getByText(' Save in .XLS ').or(page.getByText(' Save in XLS')).or(this.page.locator('.threepoints-block'));
        this._nextButton = page.getByText('Next');
        this._yesButton = (this.page.locator('.main__modal.active')).locator(this.page.getByText('Yes'))
        this._noButton = (this.page.locator('.main__modal.active')).locator(this.page.getByText('No'))
        this._applyButton = page.getByText('Apply');
        this._clearButton = page.getByText('Clear',{ exact: true });
        this._addCountryButton = page.getByText('Add country');
        this._okButton = page.getByRole('button', { name: 'ОК' });
        this._backButton = page.locator('use[*|href="#icon-arrow"]');
        this._onButton = page.getByText('On',{ exact: true });
        this._offButton = page.getByText('Turn off',{ exact: true });
        this._editButton = page.getByText('Edit',{ exact: true });
        this._exportButton = page.getByText('Export',{ exact: true });
        this._exportSensorsButton = page.getByText('Export sensors to xls',{ exact: true });
        this._changeButton = page.getByText('Change',{ exact: true });
        this._connectButton = page.getByText('Connect',{ exact: true })
        this._sendButton = page.getByText('Send',{ exact: true });
        this._resendEmailButton = page.getByText('Resend Email',{ exact: true });
        this._deleteNotExactButton = page.getByText('Delete');

        // FIELDS
        this._inputFirstField = this.page.locator('.mat-mdc-input-element').nth(0).or(this.page.locator('.input_block-input').nth(0));;
        this._inputSecondField = this.page.locator('.mat-mdc-input-element').nth(1).or(this.page.locator('.input_block-input').nth(1));;
        this._inputThirdField = this.page.locator('.mat-mdc-input-element').nth(2).or(this.page.locator('.input_block-input').nth(2));;
        this._inputFourthField = this.page.locator('.mat-mdc-input-element').nth(3).or(this.page.locator('.input_block-input').nth(3));;
        this._inputFifthField = this.page.locator('.mat-mdc-input-element').nth(4).or(this.page.locator('.input_block-input').nth(4));;
        this._inputSixthField = this.page.locator('.mat-mdc-input-element').nth(5).or(this.page.locator('.input_block-input').nth(5));;
        this._inputSeventhField = this.page.locator('.mat-mdc-input-element').nth(6).or(this.page.locator('.input_block-input').nth(6));;
        this._selectFirstField = this.page.locator('.mat-mdc-select-value').nth(0).or(this.page.locator('.input-block__select-text').nth(0));
        this._selectSecondField = this.page.locator('.mat-mdc-select-value').nth(1).or(this.page.locator('.input-block__select-text').nth(1));;
        this._selectThirdField = this.page.locator('.mat-mdc-select-value').nth(2).or(this.page.locator('.input-block__select-text').nth(2));;
        this._inputField = page.locator('input[type="text"]');
        this._searchField = page.locator('input[placeholder*="Search"]');

        // ICONS
        this._trashIcon = page.locator('use[*|href="#icon-trash"]');
        this._banIcon = page.locator('use[*|href="#icon-ban"]');
        this._editIcon = page.locator('use[*|href="#icon-edit-data"]');
        this._informationIcon = page.locator('use[*|href="#icon-About"]');
        this._updateFirmwareIcon = page.locator('mat-icon[data-mat-icon-name="update-firmware"]');
        this._connectionOnlineIcon = page.locator('mat-icon[data-mat-icon-name="connection-online"]');
        this._tamperOpenIcon = page.locator('mat-icon[data-mat-icon-name="tamper-open"]');
        this._adsIcon = page.locator('use[*|href="#icon-ads"]');

        // SECTIONS
        this._panels = page.getByText('Panels',{ exact: true });
        this._company = page.getByText('Company',{ exact: true });
        this._companies = page.getByText('Companies',{ exact: true });
        this._dealers = page.getByText('Dealers',{ exact: true });
        this._employees= page.getByText('Employees',{ exact: true });
        this._requests= page.getByText('Requests',{ exact: true });
        this._history= page.getByText('History',{ exact: true });
        this._routing= page.getByText('Routing',{ exact: true });
        this._automation= page.getByText('Automation',{ exact: true });
        this._feedback = page.getByText('Feedback');
        this._permissions = page.getByText('Permissions');
        this._groupsOfCompanies = page.getByText('Groups of companies');
        this._users = page.getByText('Users').and(this.page.locator('.navbar__sub-text'));
        this._system = page.getByText('System',{ exact: true });
        this._troubles = page.getByText('Troubles',{ exact: true });
        this._groups = page.getByText('Groups',{ exact: true });
        this._myProfile = page.getByText('My profile',{ exact: true });

        // OTHERS
        this._pageTitle = page.locator('h3');
        this._entityBlock = this.page.locator('.part__item');
        this._dateBlock = this.page.locator('.date-block');
        this._notExistEntity = this.page.locator('.color-not-exist');
        this._existEntity = this.page.locator('.color-exist');
        this._rowBlock = this.page.locator('.part__item-table-row');
        this._entityText = this.page.locator('.part__item-text');
        this._entityText1 = this.page.locator('.ellipsis');
    }

    get saveButton(): Locator {
        return this._saveButton;
    }

    get updateFirmwareIcon(): Locator {
        return this._updateFirmwareIcon;
    }

    get change_Button(): Locator {
        return this._change_Button;
    }

    get submitModalButton(): Locator {
        return this._submitModalButton;
    }

    get deleteButton(): Locator {
        return this._deleteButton;
    }

    get connectionOnlineIcon(): Locator {
        return this._connectionOnlineIcon;
    }

    get tamperOpenIcon(): Locator {
        return this._tamperOpenIcon;
    }


    get troubles (): Locator {
        return this._troubles ;
    }

    get addCountryButton(): Locator {
        return this._addCountryButton;
    }

    get users(): Locator {
        return this._users;
    }

    get system(): Locator {
        return this._system;
    }

    get myprofile(): Locator {
        return this._myProfile;
    }

    get clearButton(): Locator {
        return this._clearButton;
    }

    get groups(): Locator {
        return this._groups;
    }

    get closeButton(): Locator {
        return this._closeButton;
    }

    get deleteUserButton(): Locator {
        return this._deleteUserButton;
    }

    get trashIcon(): Locator {
        return this._trashIcon;
    }

    get banIcon(): Locator {
        return this._banIcon;
    }

    get submitButton(): Locator {
        return this._submitButton;
    }

    get deleteNotExactButton (): Locator {
        return this._deleteNotExactButton ;
    }

    get addButton(): Locator {
        return this._addButton;
    }

    get disableButton(): Locator {
        return this._disableButton;
    }

    get closeWindowButton(): Locator {
        return this._closeWindowButton;
    }

    get enableButton(): Locator {
        return this._enableButton;
    }

    get enabledButton(): Locator {
        return this._enabledButton;
    }

    get nextButton(): Locator {
        return this._nextButton;
    }

    get yesButton(): Locator {
        return this._yesButton;
    }

    get noButton(): Locator {
        return this._noButton;
    }

    get okButton(): Locator {
        return this._okButton;
    }

    get backButton(): Locator {
        return this._backButton;
    }

    get onButton(): Locator {
        return this._onButton;
    }

    get offButton(): Locator {
        return this._offButton;
    }

    get editButton(): Locator {
        return this._editButton;
    }

    get exportButton(): Locator {
        return this._exportButton;
    }

    get exportSensorsButton(): Locator {
        return this._exportSensorsButton;
    }

    get changeButton(): Locator {
        return this._changeButton;
    }

    get inputFirstField(): Locator {
        return this._inputFirstField;
    }

    get inputSecondField(): Locator {
        return this._inputSecondField;
    }

    get inputThirdField(): Locator {
        return this._inputThirdField;
    }

    get inputFourthField(): Locator {
        return this._inputFourthField;
    }

    get inputFifthField(): Locator {
        return this._inputFifthField;
    }

    get inputSixthtField(): Locator {
        return this._inputSixthField;
    }

    get inputSeventhField(): Locator {
        return this._inputSeventhField;
    }

    get selectFirstField(): Locator {
        return this._selectFirstField;
    }

    get selectSecondField(): Locator {
        return this._selectSecondField;
    }

    get selectThirdField(): Locator {
        return this._selectThirdField;
    }

    get entityBlock(): Locator {
        return this._entityBlock;
    }

    get dateBlock(): Locator {
        return this._dateBlock;
    }

    get entityText(): Locator {
        return this._entityText;
    }

    get entityText1(): Locator {
        return this._entityText1;
    }

    get inputField(): Locator {
        return this._inputField;
    }

    get connectButton(): Locator {
        return this._connectButton;
    }

    get sendButton(): Locator {
        return this._sendButton;
    }

    get resendEmailButton(): Locator {
        return this._resendEmailButton;
    }

    get informationIcon (): Locator {
        return this._informationIcon  ;
    }

    get searchField (): Locator {
        return this._searchField  ;
    }

    get pageTitle (): Locator {
        return this._pageTitle  ;
    }

    get rowBlock (): Locator {
        return this._rowBlock  ;
    }

    get applyButton (): Locator {
        return this._applyButton ;
    }

    get searchButton (): Locator {
        return this._searchButton ;
    }

    get adsIcon (): Locator {
        return this._adsIcon ;
    }

    get saveInXLSButton (): Locator {
        return this._saveInXLSButton ;
    }

    get notExistEntity (): Locator {
        return this._notExistEntity ;
    }

    get existEntity (): Locator {
        return this._existEntity ;
    }

    get editIcon (): Locator {
        return this._editIcon ;
    }

    get panels(): Locator {
        return this._panels;
    }

    get company(): Locator {
        return this._company;
    }

    get companies(): Locator {
        return this._companies;
    }

    get dealers(): Locator {
        return this._dealers;
    }

    get routing(): Locator {
        return this._routing;
    }

    get automation(): Locator {
        return this._automation;
    }

    get feedback(): Locator {
        return this._feedback;
    }

    get permissions(): Locator {
        return this._permissions;
    }

    get groupsOfCompanies(): Locator {
        return this._groupsOfCompanies;
    }

    get requests (): Locator {
        return this._requests;
    }

    get history (): Locator {
        return this._history;
    }

    get employees (): Locator {
        return this._employees;
    }

    async openLoginPage(path: string) {
        await this.page.goto(path);
    }

    async clickOnButton(locator: Locator) {
        return locator.click();
    }

    async findByText(text: string) {
        return this.page.getByText(text);
    }

    async findByTextExact(text: string) {
        return this.page.getByText((text), { exact: true });
    }

    async updateFirmwareChecking(page1: BasePage) {
        await this.page.waitForTimeout(2000);
        if (await this.page.getByText(TITLE_UPDATE_FIRMWARE_VERSION).isVisible()) {
            await page1.closeWindowButton.click();}
    }

}