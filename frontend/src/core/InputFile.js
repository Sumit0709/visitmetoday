import React from 'react'

import CommonCss from '../core/CommonCss.css'

const InputFile = () => {
  return (
    <div>
        {/* If you wish to reference an existing file (i.e. from your database), pass the url into imageData() */}
        <div x-data="imageData()" className="file-input flex items-center">
                {/* Preview Image  */}
            <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">

                <div x-show="!previewPhoto" >
                <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>

                {/* Show a preview of the photo  */}
                <div x-show="previewPhoto" className="h-12 w-12 rounded-full overflow-hidden">
                <img src="previewPhoto" alt="" className="h-12 w-12 object-cover"/>
                </div>
            </div>

            <div className="flex items-center">
            {/* File Input  */}
            <div className="ml-5 rounded-md shadow-sm">
             {/* Replace the file input styles with our own via the label */}
            <input onChange="updatePreview($refs)" x-ref="input"
                    type="file" 
                    accept="image/*,capture=camera" 
                    name="photo" id="photo" 
                    className="custom"/>
            <label htmlFor="photo" 
                    className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-indigo-500 hover:border-indigo-300 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo active:bg-gray-50 active:text-indigo-800 transition duration-150 ease-in-out">
                Upload Photo
            </label>
            </div>
            <div className="flex items-center text-sm text-gray-500 mx-2">
            {/* Display the file name when available  */}
            <span x-text="fileName || emptyText"></span>
            {/* Removes the selected file  */}
            <button x-show="fileName"
                    onClick="clearPreview($refs)"
                    type="button"
                    aria-label="Remove image"
                    className="mx-1 mt-1">
                <svg viewBox="0 0 20 20" fill="currentColor" className="x-circle w-4 h-4"
                    aria-hidden="true" focusable="false"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
            </button>
            </div>
            
        </div>

        </div>
    </div>
  )
}

export default InputFile;