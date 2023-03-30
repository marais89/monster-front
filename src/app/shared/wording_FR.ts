export const Wording_FR = {
  dialog: {
    message: {
      suspend: {
        info: 'Voulez-Vous vraiment <strong>bloquer</strong> cet utilisateur',
        success: 'L\'utilisateur a été <strong>bloqué</strong> avec succés',
        error: 'Nous n\'avons pas pu effectuer votre demande, un problème technique est survenue',
      },
      resume: {
        info: 'Voulez-Vous vraiment <strong>reactiver</strong> cet utilisateur',
        success: 'L\'utilisateur a été <strong>reactivé</strong> avec succés',
        error: 'Nous n\'avons pas pu effectuer votre demande, un problème technique est survenue',
      },
      deactivate: {
        info: 'Voulez-Vous vraiment <strong>supprimer</strong> cet utilisateur',
        success: 'L\'utilisateur a été <strong>supprimé</strong> avec succés',
        error: 'Nous n\'avons pas pu effectuer votre demande, un problème technique est survenue',
      },
      update: {
        ok: 'Vos Informations ont été mis a jour avec succée',
        ko: 'Nous n\'avans pas pu éffectuer votre demande, veiller réessayer ultériairement',
      },
      create: {
        ok: 'Informations ajouter avec succée',
      },
      create_user_1: 'Votre compte a été bien créé.',
      create_user_2: 'Vous pouvez dès maintenant vous connecter en utilisant votre login et mot de passe',
      create_user_existe: 'Un compte existe déja avec ce pseudonyme',
      create_email_existe: 'Un compte existe déja avec cette adresse e-mail',
      authorities_error: 'Vous n\'avez pas les droits nécessaires pour cette fonctionnalité',
      valitation_account: 'Votre compte a été activé avec succés',
      update_password: "Votre mot de passe à été modifié avec succée",
      validation_account_error: 'Votre code de validation est expiré ou n\'est pas valide',
      send_msg_error: 'Nous n\'avans pas pu vous envoyer votre E-mail de validation, vérifiez si votre adresse E-mail est bonne !',
    },
    button: {
      confirm: 'Valider',
      concel: 'Annuler',
      close: 'Fermer',
      return: 'Retour',
    },
    title: {
      confirm: 'Confirmation',
      info: 'Information',
    }
  },
  individu_list: {
    title: 'Liste des Clients',
    no_result: 'Aucun résultat',
    actions: {
      suspend: 'Suspendre',
      resume: 'Activer',
      deactivate: 'Désactiver',
      history: 'Historique',
    }
  },
  individu_account: {
    title: 'Mon profile',
    mondatory: 'Ce champ est <strong>Obligatoire</strong>',
    all_mondatory: 'Tous les champs avec (*) sont <strong>Obligatoire</strong>',
    sous_date: 'Date d\'inscription',
    last_connection_date: 'Dernière connexion',
    account_status: {
      waiting: 'Votre compte est en attente d\'activation',
      active: 'Votre compte est active',
      blocked: 'Votre compte est bloqué',
      canceled: 'Votre compte est résilié'
    },
    informations_perso: 'Informations personelles',
  },
  individu_create: {
    title: 'Informations Client',
    pw_regex: 'Le mot de passe doit contenir <strong>lettre MAJ, lettre min, chiffre, caractére spécial</strong>',
    pw_identique: 'Le mot de passe <strong>doit étre identique</strong>',
    create_btn: 'Créer mon compte',
    return_btn: 'Retour'
  },
  password_update: {
    title: 'Modifier mon mot de passe',
    old_password: 'Ancien mot de passe',
    new_password: 'Nouveau mot de passe',
    new_password_confirm: 'Nouveau mot de passe confirmation',
  },
  login: {
    title: 'Connexion',
    error1: 'Login ou mot de passe incorrect !',
    error2: 'Votre compte est désactivé, veuillez contacter le service client !',
    attempts_worning: 'Au bout de 5 tentatives erronées, votre compte sera bloqué,',
    attempts_remaining: 'Tentative de connexion restante.',
    userName: 'nom d\'utilisateur',
    pwd: 'Mot de passe',
    mondatory: 'Ce champ est obligatoire',
    remember_me: 'Souviens de moi',
    confirm: 'Valider',
    signUp: 'inscrivez-vous',
    signUp_msg: 'Vous n\'avez pas de compte',
    forgot_pwd: 'mot de passe oublié ?',
    reinit_pwd: 'Initialié votre mot de passe',
    reinit_session_expired: 'La session a expirée, veillez reéssayé',
    reinit_pwd_msg_succes: 'Votre mot de passe a été initialié avec succes',
    renit_pwd_starting_process: 'Entrez votre adresse mail pour réinitialiser votre mot de passe et laissez-vous guider.',
    reinit_pwd_wrong_email: 'l\'adresse e-mail n\'est pas reconnue.',
    reinit_pwd_email_sent: 'Un e-mail vous a été envoyer pour modifier votre mot de passe.',
  },
  schedules: {
    title: 'Planning',
  },
  header_toolBar: {
    home: 'Accueil',
    planning: 'planning',
    product: 'Produits',
    administration: 'Gérer',
    welcome: 'Bonjour',
    order: 'Mes commandes',
    account: 'Mon compte',
    business: 'Mon entreprise',
    language: {
      title: 'Language',
      fr: 'Francais',
      en: 'Anglais',
    },
    updatePwd: 'Changer mon mot de passe',
    logout: 'Déconnexion',
    help: 'Aide',
    connect: 'Connectez-vous'
  },
  individu: {
    attributs: {
      firstName: 'Prénom',
      lastName: 'Nom',
      username: 'Pseudonyme',
      bornDate: 'Date de naissance',
      email: 'E-mail',
      address: 'Adresse',
      ville: 'Ville',
      code_postale: 'Code postale',
      status: 'Statut',
      level: 'Niveau',
      tel: 'numéro de téléphone',
      pwd: 'Mot de passe',
      confirm_pwd: 'Confirmation du mot de passe',
      img_max_size_msg: 'La taille maximale de l\'image autorisée ne doit pas dépasser <strong>2 MO</strong>',
    }
  },
  address: {
    title: 'adresse',
    gouvernorat: 'Gouvernorat',
    ville: 'Ville',
    city: 'Cité',
    postal_code: 'Code postale',
    invalide_adr: 'Votre adresse est incomplète sélectionnez <strong>(Gouvernorat, Ville, cité)</strong> et écrire <strong>le numéro et le nom de votre rue</strong>',
  },
  business:{
    title: 'Information de l\'entreprise',
    name: 'Nom',
    description: 'Description',
    creator: 'Propriétaire',
    creation_date: 'Date création',
    status: 'Etat',
    mondatory: 'Ce champ est <strong>Obligatoire</strong>',
    creation_not_allowed: 'Votre statut actuel ne vous permet pas de créer une entreprise, votre statut est :',
    address: 'Adresse',
    upgrade_to_pro_client: 'Devenir client PRO',
    group: 'Groupes',
    affect: 'affectation'
  },
  problem: ' Un probléme technique est survenue !'
};
