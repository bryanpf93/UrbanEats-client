import { modals } from "@mantine/modals";

function ConfirmModal({
  title = "Confirmar acción",
  message = "¿Estás seguro?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  color = "red",
  onConfirm,
}) {
  modals.openConfirmModal({
    title: (
      <div style={{ width: "100%", textAlign: "center" }}>
        {title}
      </div>
    ),

    children: (
      <div style={{ textAlign: "center" }}>
        {message}
      </div>
    ),

    labels: {
      confirm: confirmText,
      cancel: cancelText,
    },

    centered: true,

    confirmProps: {
      color,
    },

    groupProps: {
      justify: "center",
    },

    styles: {
      body: {
        textAlign: "center",
      },

      header: {
        justifyContent: "center",
      },

      title: {
        width: "100%",
        textAlign: "center",
      },
    },

    onConfirm,
  });
}

export default ConfirmModal