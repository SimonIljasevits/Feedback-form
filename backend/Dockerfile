FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["FeedbackFormAPI.csproj", "./"]
RUN dotnet restore "FeedbackFormAPI.csproj"

COPY . .
RUN dotnet publish "FeedbackFormAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_HTTP_PORTS=8080

COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "FeedbackFormAPI.dll"]
