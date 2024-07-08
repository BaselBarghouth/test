import { CircleFlag } from "react-circle-flags";
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
      <div className=" mt-4 shadow-md  shadow-gray-400 p-4">
        <legend className="text-sm font-semibold leading-6 text-gray-900">
          {(props.attribute.charAt(0).toUpperCase() + props.attribute.slice(1))
            .split("_")
            .join(" ")}{" "}
          :
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
            <div className="flex items-center space-x-2">
              {props.attribute === "color" && (
                <div
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: item.value }}
                ></div>
              )}
              {props.attribute === "country" && (
                <CircleFlag countryCode={item.value} height="20" width="20" />
              )}
              {props.attribute === "length" && (
                <span className="text-gray-900">{item.value} cm</span>
              )}
              {props.attribute === "weight" && (
                <span className="text-gray-900">{item.value} gr</span>
              )}
              {props.attribute === "grower" && (
                <span className="text-gray-900">{item.value}</span>
              )}
              {props.attribute === "buds_per_stem" && (
                <span className="text-gray-900">{item.value}</span>
              )}
              <span className="text-yellow-800">({item.count})</span>
            </div>
          </div>
        ))}
      </div>
    )
  );
}
