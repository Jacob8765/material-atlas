import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";

interface AddRemoveFormButtonProps {
  append: any;
  remove: any;
}

export default function AddRemoveFormButton({
  append,
  remove,
}: AddRemoveFormButtonProps) {
  return (
    <div className="justify-left flex">
      <MinusCircleOutlined
        className="dynamic-delete-button mr-3"
        onClick={() => remove()}
      />
      <PlusCircleOutlined
        className="dynamic-delete-button"
        onClick={() => append({ cementWeight: { unit: "kg" } })}
      />
    </div>
  );
}
