export const Wording = {
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
      authorities_error: 'Vous n\'avez pas les droits nécessaires pour cette fonctionnalité',
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
    account_status: {
      waiting: 'Votre compte est en attente d\'activation',
      active: 'Votre compte est active',
      blocked: 'Votre compte est bloqué',
      canceled: 'Votre compte est résilié'
    },
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
    language: 'Language',
    logout: 'Déconnexion',
    help: 'Aide',
  },
  individu: {
    attributs: {
      firstName: 'Prénom',
      lastName: 'Nom',
      bornDate: 'Date de naissance',
      email: 'E-mail',
      address: 'Adresse',
      status: 'Statut',
      tel: 'numéro de téléphone',
      pwd: 'Mot de passe',
      confirm_pwd: 'Confirmation du mot de passe',
    }
  },
  problem: ' Un probléme technique est survenue !'
};
