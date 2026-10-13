import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegisterPage extends BasePage {

    // 1. Private locator
    private readonly registerAccountHeader: Locator;
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly email: Locator;
    private readonly telephone: Locator;
    private readonly password: Locator;
    private readonly confirmPassword: Locator;
    private readonly subscribeYes: Locator;
    private readonly privacyPolicy: Locator;
    private readonly continueBtn: Locator;
    private readonly loginLink: Locator;
    private readonly registerError: Locator;
    private readonly registerLink: Locator;
    private readonly heading: Locator;

    // 2. constructor of the page: init the locator
    
    constructor(page: Page){
        super(page);
        this.registerAccountHeader = page.getByRole('heading', { name: 'Register Account', level: 1 });
        this.firstName = page.getByRole('textbox', { name: '* First Name' });
        this.lastName = page.getByRole('textbox', { name: '* Last Name' });
        this.email = page.getByRole('textbox', { name: '* E-Mail' });
        this.telephone = page.getByRole('textbox', { name: '* Telephone' });
        this.password = page.getByRole('textbox', { name: '* Password', exact: true });
        this.confirmPassword = page.getByRole('textbox', { name: '* Password Confirm' });
        this.subscribeYes = page.getByRole('radio', { name: 'Yes' });
        this.privacyPolicy = page.locator('[name="agree"]');
        this.continueBtn = page.getByRole('button', { name: 'Continue' });
        this.loginLink = page.getByRole('link', { name: 'Login' , exact:true });
        this.registerError = page.getByText('Warning: You must agree to the Privacy Policy!', { exact: true });
        this.registerLink = page.getByRole('link', { name: 'Register' });
        this.heading = page.getByRole('heading');
        
    }

    // 3. public page actions : methods/behaviour of the page (encapsulation)

    async getRegisterPageTitle() : Promise<string>{
        return await this.page.title();
    }

    async isHeaderExist() : Promise<boolean> {
       // console.log(await this.heading.allTextContents());
        return await this.registerAccountHeader.isVisible();
    }

    async isLoginLinkExist() : Promise<boolean> {
        return await this.loginLink.isVisible();
    }

    async goToRegisterPage() : Promise<void> {
        await this.page.goto('opencart/index.php?route=account/register');
    }

    async doRegister(fname:string, lname:string, email:string, telephone:string, pass:string, confPassword:string) : Promise<void>{
        console.log(`User registration details : ${fname} - ${lname} - - ${email} - ${telephone}- ${pass}- ${confPassword} `);
        await this.firstName.fill(fname);
        await this.lastName.fill(lname);
        await this.email.fill(email);
        await this.telephone.fill(telephone);
        await this.password.fill(pass);
        await this.confirmPassword.fill(confPassword);
        await this.subscribeYes.click();
        await this.privacyPolicy.click();
        await this.continueBtn.click();
        
    }

    async isInvalidLoginErrorDisplayed():Promise<boolean>{
        await this.continueBtn.click();
        return await this.registerError.isVisible();
    }
}
