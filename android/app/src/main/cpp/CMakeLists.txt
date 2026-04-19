cmake_minimum_required(VERSION 3.22.1)
project("hifi_audio_engine")

# Oboe library (assuming it's installed or provided)
# In a real environment, you'd fetch it with FetchContent or have it in libs
# For now, we define our native source

add_library(${CMAKE_PROJECT_NAME} SHARED
    native_crash_handler.cpp
    # Add other C++ files here as they are developed
)

target_link_libraries(${CMAKE_PROJECT_NAME}
    log
    android
)
