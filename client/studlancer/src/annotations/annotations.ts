import { Annotations } from "../zus-stores/testStore";

const justBoldAnnotations: Annotations = {
  bold: true,
  backgroundColor: "default",
  textColor: "default",
};

const redTextAnnotations: Annotations = {
  bold: false,
  backgroundColor: "default",
  textColor: "red",
};
export { justBoldAnnotations, redTextAnnotations };
