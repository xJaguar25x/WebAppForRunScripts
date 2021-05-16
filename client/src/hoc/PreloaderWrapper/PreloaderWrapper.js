import React, {Fragment} from 'react';
import {Preloader} from "../../components";

function PreloaderWrapper(
  {
      children,
      isLoading,
      isError,
      isEmpty,
      emptyText,
      fetch,
    type
  }) {
    const showPreloader = isLoading && !isError;
    const allDataIsReady = !isLoading && !isError; //&& !isEmpty;
    const showEmptyText = allDataIsReady && isEmpty && emptyText;
//TODO: доделать возможность изменять размер и цвет через пропсы. Не работает этот компонент, проблемы с пропсами в ColumnList.js
//     console.log("type=%s isLoading= isError = isEmpty = ", type, !isLoading,!isError, !isEmpty , allDataIsReady)

    return (
      <Fragment>
          {showPreloader && <Preloader/>}
          {/*{isError && <TryAgain fetch={fetch}/>}*/}
          {/*{showEmptyText && <div>{emptyText}</div>}*/}
          {showEmptyText && <div className="Empty">{emptyText}</div>}
          {allDataIsReady && children}
      </Fragment>
    );
}

export default PreloaderWrapper;