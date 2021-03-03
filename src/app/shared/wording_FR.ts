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
      create_user_1: 'Votre compte a été bien créé.',
      create_user_2: 'Vous pouvez dès maintenant vous connecter en utilisant votre login et mot de passe',
      create_user_existe: 'Un compte existe déja avec ce pseudonyme',
      create_email_existe: 'Un compte existe déja avec cette adresse e-mail',
      authorities_error: 'Vous n\'avez pas les droits nécessaires pour cette fonctionnalité',
      valitation_account: 'Votre compte a été activé avec succés',
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
    }
  },
  individu_account: {
    title: 'Mon profile',
    mondatory: 'Ce champ est <strong>Obligatoire</strong>',
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
  login: {
    title: 'Login',
    error1: 'Login ou mot de passe incorrect !',
    error2: 'Votre compte est désactivé, veuillez contacter le service client !',
    userName: 'nom d\'utilisateur',
    pwd: 'Mot de passe',
    mondatory: 'Ce champ est obligatoire',
    remember_me: 'Souviens de moi',
    confirm: 'Valider',
    signUp: 'inscrivez-vous',
    signUp_msg: 'Vous n\'avez pas de compte',
    forgot_pwd: 'mot de passe oublié ?'
  },
  header_toolBar: {
    home: 'Accueil',
    product: 'Produits',
    administration: 'Gérer',
    welcome: 'Bonjour',
    order: 'Mes commandes',
    account: 'Mon compte',
    language: {
      title: 'Language',
      fr: 'Francais',
      en: 'Anglais',
    },
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
  problem: ' Un probléme technique est survenue !'
};
