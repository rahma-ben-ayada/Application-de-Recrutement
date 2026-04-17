const nodemailer = require('nodemailer');
const config = require('../config/constants');

// Créer le transporteur d'email
const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: false,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

// Envoyer un email
const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: config.email.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé:', info.response);
    return { success: true, info };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return { success: false, error };
  }
};

// Template email de confirmation d'inscription
const emailConfirmationInscription = (nom, email, token) => {
  const confirmationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/confirmer-email?token=${token}`;

  return {
    to: email,
    subject: 'Bienvenue sur SmartRecruit 🎉',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0A1628 0%, #1E3A5F 100%); color: #fff; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%); color: #0A1628; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; font-size: 12px; color: #999; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Bienvenue sur SmartRecruit !</h1>
            <p>Connectez les meilleurs talents aux meilleures opportunités</p>
          </div>
          <div class="content">
            <p>Bonjour <strong>${nom}</strong>,</p>
            <p>Merci de vous être inscrit sur SmartRecruit. Votre compte a été créé avec succès.</p>
            <p>Pour confirmer votre adresse email, veuillez cliquer sur le bouton ci-dessous :</p>
            <div style="text-align: center;">
              <a href="${confirmationUrl}" class="button">Confirmer mon email</a>
            </div>
            <p>Si vous n'avez pas créé de compte, veuillez ignorer cet email.</p>
          </div>
          <div class="footer">
            <p>© 2024 SmartRecruit. Tous droits réservés.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
};

// Template email de réinitialisation de mot de passe
const emailResetPassword = (email, token) => {
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;

  return {
    to: email,
    subject: 'Réinitialisation de votre mot de passe',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0A1628 0%, #1E3A5F 100%); color: #fff; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%); color: #0A1628; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 20px 0; }
          .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 10px 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Réinitialisation de mot de passe</h1>
          <p>SmartRecruit - Plateforme de Recrutement Premium</p>
          </div>
          <div class="content">
            <p>Bonjour,</p>
            <p>Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le bouton ci-dessous pour continuer :</p>
            <div style="text-align: center;">
              <a href="${resetUrl}" class="button">Réinitialiser mon mot de passe</a>
            </div>
            <p>Ce lien expire dans <strong>1 heure</strong>.</p>
            <div class="warning">
              ⚠️ Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email et sécuriser votre compte.
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };
};

// Template email de confirmation de candidature
const emailConfirmationCandidature = (candidat, offre, recruteur) => {
  return {
    to: candidat.email,
    subject: '✅ Candidature envoyée avec succès',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: #fff; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .info { background: #e0f2fe; padding: 15px; border-radius: 8px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Candidature envoyée !</h1>
            <p>Votre candidature a été envoyée avec succès</p>
          </div>
          <div class="content">
            <p>Bonjour <strong>${candidat.nom}</strong>,</p>
            <p>Votre candidature pour le poste de <strong>${offre.titre}</strong> a bien été reçue par <strong>${recruteur.entreprise}</strong>.</p>

            <div class="info">
              <strong>📋 Poste :</strong> ${offre.titre}<br>
              <strong>🏢 Entreprise :</strong> ${recruteur.entreprise}<br>
              <strong>📍 Lieu :</strong> ${offre.lieu}<br>
              <strong>💰 Salaire :</strong> ${offre.salaire || 'Non spécifié'}
            </div>

            <p>Le recruteur examinera votre candidature et vous contactera si votre profil correspond au poste.</p>
            <p>Vous pouvez suivre l'état de votre candidature depuis votre espace candidat.</p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/candidat/candidatures" style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: #fff; text-decoration: none; border-radius: 25px; font-weight: bold;">
                Voir mes candidatures
              </a>
            </div>

            <p style="font-size: 12px; color: #999;">
              Ceci est un email automatique, merci de ne pas y répondre.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
};

// Template email d'invitation à entretien
const emailInvitationEntretien = (candidat, entretien, offre) => {
  const meetingUrl = entretien.lien || '';

  return {
    to: candidat.email,
    subject: `🎯 Vous êtes invité à un entretien - ${offre.titre}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%); color: #fff; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .info { background: #f3e8ff; padding: 15px; border-radius: 8px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 Invitation à un entretien</h1>
            <p>Félicitations ! Vous avez été sélectionné(e)</p>
          </div>
          <div class="content">
            <p>Bonjour <strong>${candidat.nom}</strong>,</p>
            <p>Nous sommes ravis de votre candidature pour le poste de <strong>${offre.titre}</strong>.</p>
            <p>Votre profil a retenu notre attention et nous souhaitons vous rencontrer en entretien.</p>

            <div class="info">
              <strong>📅 Date :</strong> ${new Date(entretien.date).toLocaleDateString('fr-FR')}<br>
              <strong>⏰ Heure :</strong> ${entretien.heure}<br>
              <strong>📍 Lieu :</strong> ${entretien.lieu || 'En ligne'}<br>
              ${meetingUrl ? `<strong>🔗 Lien :</strong> <a href="${meetingUrl}">${meetingUrl}</a>` : ''}
            </div>

            <p>Veuillez confirmer votre présence en vous connectant à votre espace candidat.</p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/candidat/entretiens" style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%); color: #fff; text-decoration: none; border-radius: 25px; font-weight: bold;">
                Confirmer ma présence
              </a>
            </div>

            <p style="font-size: 12px; color: #999;">
              Ceci est un email automatique, merci de ne pas y répondre directement.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
};

// Template email d'alerte nouvelle offre
const emailAlerteNouvelleOffre = (alerte, offres) => {
  const offresList = offres.map(offre => `
    <div style="background: #fff; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #D4AF37;">
      <strong>${offre.titre}</strong><br>
      🏢 ${offre.recruteur.entreprise}<br>
      📍 ${offre.lieu}<br>
      💰 ${offre.salaire || 'Non spécifié'}
    </div>
  `).join('');

  return {
    to: alerte.utilisateur.email,
    subject: `🔔 ${offres.length} nouvelle(s) offre(s) correspondante(s) à votre alerte`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%); color: #0A1628; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 Nouvelles offres disponibles !</h1>
            <p>Vos critères de recherche ont trouvé des correspondances</p>
          </div>
          <div class="content">
            <p>Bonjour,</p>
            <p>Votre alerte <strong>"${alerte.titre}"</strong> a trouvé <strong>${offres.length}</strong> nouvelle(s) offre(s) qui correspondent à vos critères.</p>

            ${offresList}

            <p>Connectez-vous à SmartRecruit pour postuler à ces offres.</p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/candidat/offres" style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%); color: #0A1628; text-decoration: none; border-radius: 25px; font-weight: bold;">
                Voir les offres
              </a>
            </div>

            <p style="font-size: 12px; color: #999;">
              Pour ne plus recevoir ces emails, modifiez vos paramètres de notification.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
};

module.exports = {
  sendEmail,
  emailConfirmationInscription,
  emailResetPassword,
  emailConfirmationCandidature,
  emailInvitationEntretien,
  emailAlerteNouvelleOffre,
};
