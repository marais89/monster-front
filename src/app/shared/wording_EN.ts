export const Wording_EN = {
  dialog: {
    message: {
      suspend: {
        info: 'Are you sure you want to <strong> block </strong> this user',
        success: 'The user has been <strong> blocked </strong> successfully',
        error: 'We were unable to complete your request, a technical problem occurred',
      },
      resume: {
        info: 'Are you sure you want to <strong> reactivate </strong> this user',
        success: 'The user has been <strong> reactivated </strong> successfully',
        error: 'We were unable to complete your request, a technical problem occurred',
      },
      deactivate: {
        info: 'Are you sure you want to <strong> delete </strong> this user',
        success: 'The user has been <strong> deleted </strong> successfully',
        error: 'We were unable to complete your request, a technical problem occurred',
      },
      update: {
        ok: 'Your information has been updated successfully',
        ko: 'We could not make your request, try again later...',
      },
      create_user_1: 'Your account has been successfully created.',
      create_user_2: 'You can now log in using your login and password',
      create_user_existe: 'An account already exists with this pseudonym',
      create_email_existe: 'An account already exists with this e-mail address',
      authorities_error: 'You do not have the necessary rights for this functionality',
      valitation_account: 'Your account has been successfully activated',
      update_password: "Your password has successfully been updated",
      validation_account_error: 'Your validation code has expired or is not valid',
      send_msg_error: 'We could not send you your validation E-mail, check if your E-mail address is correct!',
    },
    button: {
      confirm: 'Validate',
      concel: 'Cancel',
      close: 'Close',
      return: 'Back',
    },
    title: {
      confirm: 'Confirmation',
      info: 'Information',
    }
  },
  individu_list: {
    title: 'Customer\'s list',
    no_result: 'No result',
    actions: {
      suspend: 'Suspend',
      resume: 'Activate',
      deactivate: 'Deactivate',
      history: 'History',
    }
  },
  individu_account: {
    title: 'my profile',
    mondatory: '<strong> Mandatory </strong> field',
    sous_date: 'Registration date',
    last_connection_date: 'Last connection',
    account_status: {
      waiting: 'Your account is awaiting activation',
      active: 'Your account is active',
      blocked: 'Your account is blocked',
      canceled: 'Your account is terminated'
    },
    informations_perso: 'Personal informations',
  },
  individu_create: {
    title: 'Customer Information',
    pw_regex: 'The password must contain <strong> Capital letter, letter min, number, special character </strong>',
    pw_identique: 'The password <strong> must be identical </strong>',
    create_btn: 'Create my account',
    return_btn: 'Return'
  },
  password_update: {
    title: 'Update password',
    old_password: 'Old password',
    new_password: 'New password',
    new_password_confirm: 'New password confirmation',
  },
  login: {
    title: 'Login',
    error1: 'Incorrect login or password !',
    error2: 'Your account is deactivated, please contact customer service !',
    attempts_worning: 'After 5 incorrect attempts, your account will be blocked,',
    attempts_remaining: 'Connection attempt remaining.',
    userName: 'Username',
    pwd: 'Password',
    mondatory: 'Mandatory field',
    remember_me: 'Remember me',
    confirm: 'Validate',
    signUp: 'Sign up',
    signUp_msg: 'You do not have an account',
    forgot_pwd: 'Forgot your password ?'
  },
  header_toolBar: {
    home: 'Home',
    product: 'Product',
    administration: 'Manage',
    welcome: 'Hello',
    order: 'Orders',
    account: 'Account',
    language: {
      title: 'Language',
      fr: 'French',
      en: 'English',
    },
    updatePwd: 'change my password',
    logout: 'Logout',
    help: 'Help',
    connect: 'Log in'
  },
  individu: {
    attributs: {
      firstName: 'First name',
      lastName: 'Last name',
      username: 'Pseudonym',
      bornDate: 'Birthday',
      email: 'E-mail',
      address: 'Address',
      ville: 'CITY',
      code_postale: 'ZIP code',
      status: 'Status',
      level: 'Level',
      tel: 'phone number',
      pwd: 'Password',
      confirm_pwd: 'Password Confirmation',
      img_max_size_msg: 'The maximum image size allowed must not exceed <strong> 2 MB </strong>',
    }
  },
  address: {
    title: 'address',
    gouvernorat: 'Governorate',
    ville: 'Town',
    city: 'City',
    postal_code: 'Zip code',
    invalide_adr: 'Your address is incomplete select <strong> (Governorate, Town, City) </strong> and write <strong> the number and the name of your street </strong>',
  },
  business:{
    title: 'Business informations',
    name: 'Name',
    description: 'Description',
    creator: 'Creator',
    creation_date: 'Creation date',
    status: 'Status',
    mondatory: '<strong> Mandatory </strong> field',
    address: 'Address',
  },
  problem: 'A technical problem has arisen'
};
