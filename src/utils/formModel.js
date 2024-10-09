/*

import mobxReactForm from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";

const plugins = {
  dvr: dvr({ package: validatorjs }),
};

const fields = {
  modelName: {
    label: "Model Name",
    rules: "required|string|between:2,22",
  },
  horsePower: {
    label: "Horse Power",
    rules: "required|integer|min:0",
  },
  makeId: {
    label: "Make",
    rules: "required|integer",
  },
  bodyStyle: {
    label: "Body Style",
    rules: "required|string",
  },
  transmissionType: {
    label: "Transmission",
    rules: "required|string",
  },
  fuelType: {
    label: "Fuel Type",
    rules: "required|string",
  },
};

const hooks = {
  onSuccess(form) {
    alert("Form is valid! Send the request here.");

    console.log("Form Values!", form.values());
  },

  onError(form) {
    alert("Form is NOT Valid!");

    console.log("All form errors", form.errors());
  },
};

const messages = {
  required: "This field is required!",
  string: "This field must be a string.",
  integer: "This field must be an integer.",
  min: "This field must be at least :min.",
  between: "This field must be between :min and :max.",
};
const options = {
  messages,
  validateOn: "change",
};

export const form = new mobxReactForm({ fields }, { plugins, hooks });

*/
