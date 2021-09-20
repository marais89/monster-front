export class UrlUtils {

  public static BASE_URL = '//localhost:8080';
  public static INDIVIDUS_URL = '/individus';
  public static LOGIN_URL = '/login';
  public static GET_LOGGED_LOGIN_URL = '/loggedUser';
  public static DELETE_URL = '/delete/id/';
  public static CREATE_URL = '/individus/create';
  public static UPDATE_URL = '/individus/update';
  public static SUSPEND_URL = '/individus/suspend/username/';
  public static RESUME_URL = '/individus/resume/username/';
  public static DEACTIVATE_URL = '/individus/deactivate/username/';
  public static RETRIEVE_INDIVIDU_URL = '/individus/username/';
  public static CHECK_BY_EMAIL_INDIVIDU_URL = '/individus/checkEmail';
  public static UPDAT_PWD_WITH_KEY_URL = '/updatePwdWithKey';
  public static RETRIEVE_ADRESS_URL = '/individus/adress/gouvernorat/';
  public static RETRIEVE_ALLTOWN_URL = '/individus/allTown';
  public static UPDATE_PWD = '/updatePwd';
  public static ID = '';

  //Histories
  public static USERNAME_FROM_HISTORIES_URL = '/history/usernameFromHistories';
  public static RETRIEVE_EVENTS_OF_USER_URL = '/history/username/';

}
