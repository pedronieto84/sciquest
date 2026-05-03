import * as admin from "firebase-admin";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as nodemailer from "nodemailer";

admin.initializeApp();
const db = admin.firestore();

// ─────────────────────────────────────────────
// Helper: obtiene el email de un usuario
// ─────────────────────────────────────────────
async function getUserEmail(uid: string): Promise<string | null> {
  try {
    const userRecord = await admin.auth().getUser(uid);
    return userRecord.email ?? null;
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────
// Helper: crea el transporter de Gmail
// ─────────────────────────────────────────────
function createTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) throw new Error("GMAIL_USER / GMAIL_APP_PASSWORD no configurados");
  return { transporter: nodemailer.createTransport({ service: "gmail", auth: { user, pass } }), user };
}

// ─────────────────────────────────────────────
// TRIGGER 1: Amigo añadido
// Se dispara cuando se crea una friendNotification
// ─────────────────────────────────────────────
export const onFriendAdded = onDocumentCreated(
  {
    document: "friendNotifications/{userId}/items/{fromId}",
    region: "europe-west1",
  },
  async (event) => {
    const { userId } = event.params;
    const data = event.data?.data();
    if (!data) return;

    const fromName: string = data.fromDisplayName || "Un usuario";
    const recipientEmail = await getUserEmail(userId);
    if (!recipientEmail) {
      console.log(`No email found for user ${userId}`);
      return;
    }

    const { transporter, user } = createTransporter();

    await transporter.sendMail({
      from: `"SciQuest 🔬" <${user}>`,
      to: recipientEmail,
      subject: "¡Tienes un nuevo amigo en SciQuest! 👥",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:auto;background:#0f172a;color:#e2e8f0;border-radius:16px;padding:32px;">
          <h1 style="font-size:28px;margin:0 0 8px;">🔬 SciQuest</h1>
          <hr style="border:none;border-top:1px solid #334155;margin:16px 0;">
          <h2 style="font-size:20px;color:#818cf8;">¡Nuevo amigo! 👥</h2>
          <p style="color:#94a3b8;line-height:1.6;">
            <strong style="color:#e2e8f0;">${fromName}</strong> te ha añadido como amigo en SciQuest.
          </p>
          <p style="color:#94a3b8;line-height:1.6;">
            ¡Entra y reta a tus amigos en ciencia!
          </p>
          <a href="https://sciquest-fun.web.app/mi-cuenta"
             style="display:inline-block;margin-top:16px;background:#4f46e5;color:#fff;text-decoration:none;
                    padding:12px 24px;border-radius:12px;font-weight:bold;">
            Ver mis amigos →
          </a>
          <p style="margin-top:32px;font-size:12px;color:#475569;">
            Recibes este email porque alguien te añadió en SciQuest.
          </p>
        </div>
      `,
    });

    console.log(`Friend notification email sent to ${recipientEmail}`);
  }
);

// ─────────────────────────────────────────────
// TRIGGER 2: Reto lanzado
// Se dispara cuando se crea un challenge con status 'pending'
// ─────────────────────────────────────────────
export const onChallengeCreated = onDocumentCreated(
  {
    document: "challenges/{challengeId}",
    region: "europe-west1",
  },
  async (event) => {
    const data = event.data?.data();
    if (!data) return;

    // Solo si es un reto recién lanzado (pending)
    if (data.status !== "pending") return;

    const creatorUid: string = data.createdBy;
    const participants: string[] = data.participants || [];
    const participantNames: Record<string, string> = data.participantNames || {};

    // El destinatario es el participante que no es el creador
    const opponentUid = participants.find((uid) => uid !== creatorUid);
    if (!opponentUid) return;

    const opponentEmail = await getUserEmail(opponentUid);
    if (!opponentEmail) {
      console.log(`No email found for opponent ${opponentUid}`);
      return;
    }

    const creatorName = participantNames[creatorUid] || "Alguien";
    const subjectLabels: Record<string, string> = {
      chemistry: "Química 🧪",
      quantum: "Cuántica ⚛️",
      nuclear: "Nuclear ☢️",
      newtonian: "Física Newtoniana 🍎",
      mixed: "Mixto 🔬",
    };
    const subjectLabel = subjectLabels[data.subject] || data.subject;
    const challengeId = event.params.challengeId;

    const { transporter, user } = createTransporter();

    await transporter.sendMail({
      from: `"SciQuest 🔬" <${user}>`,
      to: opponentEmail,
      subject: `¡${creatorName} te ha retado en SciQuest! 🏆`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:auto;background:#0f172a;color:#e2e8f0;border-radius:16px;padding:32px;">
          <h1 style="font-size:28px;margin:0 0 8px;">🔬 SciQuest</h1>
          <hr style="border:none;border-top:1px solid #334155;margin:16px 0;">
          <h2 style="font-size:20px;color:#f59e0b;">¡Te han retado! 🏆</h2>
          <p style="color:#94a3b8;line-height:1.6;">
            <strong style="color:#e2e8f0;">${creatorName}</strong> te ha lanzado un reto de
            <strong style="color:#e2e8f0;">${subjectLabel}</strong>.
          </p>
          <p style="color:#94a3b8;line-height:1.6;">
            ¿Aceptas el desafío? Tienes que responder antes de que te adelante.
          </p>
          <a href="https://sciquest-fun.web.app/competition/${challengeId}"
             style="display:inline-block;margin-top:16px;background:#f59e0b;color:#000;text-decoration:none;
                    padding:12px 24px;border-radius:12px;font-weight:bold;">
            Aceptar el reto →
          </a>
          <p style="margin-top:32px;font-size:12px;color:#475569;">
            Recibes este email porque alguien te retó en SciQuest.
          </p>
        </div>
      `,
    });

    console.log(`Challenge email sent to ${opponentEmail} for challenge ${challengeId}`);
  }
);
