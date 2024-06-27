
import { useRefinementList } from "react-instantsearch";

export default function CustomRefinementList(props) {
  const {
    items,
    //Functions could be used to implement more features

    // hasExhaustiveItems,
    // createURL,
    refine,
    // sendEvent,
    // searchForItems,
    // isFromSearch,
    // canRefine,
    // canToggleShowMore,
    // isShowingMore,
    // toggleShowMore,
  } = useRefinementList(props);
  return (
    items.length > 0 && (
      <div className=" mt-4">
        <legend className="text-sm font-semibold leading-6 text-gray-900">
          {props.attribute.charAt(0).toUpperCase() + props.attribute.slice(1)} :
        </legend>
        {items.map((item, index) => (
          <div key={"filter" + index} className="relative flex gap-x-3">
            <div className="flex h-6 items-center">
              <input
                id={props.attribute}
                name={props.attribute}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-600"
                style={{ accentColor: "rgb(133 77 14)" }}
                onClick={() => refine(item.value)}
              />
            </div>
            <div className="text-sm leading-6 flex">
              {props.attribute == "color" ? (
                <div
                  className={`h-4 w-4 rounded-full`}
                  style={{ backgroundColor: item.value }}
                ></div>
              ) : (
                <span className="text-gray-500">{item.label}</span>
              )}
              {props.attribute != "color" && (
                <span className="text-gray-900 px-1">cm</span>
              )}
              <span className="text-yellow-800">({item.count})</span>
            </div>
          </div>
        ))}
      </div>
    )
  );
}
