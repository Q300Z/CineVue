FROM node:latest

# Install basic development tools
RUN apt update

# Install npm global
# RUN npm install -g react-devtools

# Ensure default `node` user has access to `sudo`
# ARG USERNAME=node
# RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
#     && chmod 0440 /etc/sudoers.d/$USERNAME
RUN apt install sdkmanager openjdk-17-jdk -y
RUN mkdir -p /opt/android-sdk/platforms/android-34
RUN sdkmanager "platform-tools" "platforms;android-34"
RUN chown node:node -R /opt/android-sdk/
RUN yes | sdkmanager --licenses
ENV ANDROID_SDK_ROOT=/opt/android-sdk/platforms/android-34

# Set `DEVCONTAINER` environment variable to help with orientation
ENV DEVCONTAINER=true
