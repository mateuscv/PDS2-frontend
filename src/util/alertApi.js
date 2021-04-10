import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { confirmAlert } from "react-confirm-alert"; // Import

export const alert = (title, message, buttons = [{ label: "Confirmar" }]) => {
  confirmAlert({
    title: title,
    message: message,
    buttons: buttons,
    closeOnEscape: false,
    closeOnClickOutside: false,
  });
};

export const alert_edit = (
  title,
  message,
  buttons = [{ label: "Editar" }],
  input = null
) => {
  // var but = [];
  // for (var i = 0; i < buttons.length; i++) {
  //   if (buttons[i].label !== "Cancelar") {
  //     var b = { ...buttons[i] };
  //     var f = () => b.func(input);
  //     but.push({ label: b.label, onClick: f });
  //   } else {
  //     but.push(buttons[i]);
  //   }
  // }
  confirmAlert({
    title: title,
    message: message,
    childrenElement: () => (
      <div>
        {" "}
        {/* <input
          placeholder="Editar"
          style={{ width: "90%" }}
          type="text"
          defaultValue={input}
          onKeyUp={(e) => {
            input = e.target.value;
          }}
        />{" "} */}
      </div>
    ),
    // buttons: but,
  });
};
