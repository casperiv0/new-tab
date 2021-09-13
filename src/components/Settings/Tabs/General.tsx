import { FormField } from "components/FormField";
import { PositionButtons } from "components/PositionButtons";
import { Positions } from "lib/constants";

export const GeneralTab = () => {
  function onGreetingClick() {}
  const isGreetingActive = Positions.TOP_RIGHT;

  return (
    <div className="tab">
      <form>
        <FormField fieldId="greeting-position" label="Greeting Position">
          <PositionButtons disabled={3} onClick={onGreetingClick} isActive={isGreetingActive} />
        </FormField>
      </form>
    </div>
  );
};
