module Api
  class RoutesController < ApplicationController
    def index
      routes = Rails.application.routes.routes.map do |route|
        verb_regex = route.verb
        verb = verb_regex.is_a?(String) ? verb_regex : verb_regex.inspect
        verb = verb.to_s.gsub(/[^A-Z|]/, "") # e.g. "GET|POST"

        path = route.path.spec.to_s
        controller = route.defaults[:controller]
        action = route.defaults[:action]
        name = route.name

        { name: name, verb: verb, path: path, controller: controller, action: action }
      end

      # Filter to keep things simple
      routes = routes.select do |r|
        r[:path].present? &&
          !r[:path].start_with?("/rails/") &&
          !r[:path].start_with?("/cable") &&
          !r[:path].start_with?("/assets") &&
          !r[:path].start_with?("/sidekiq") &&
          !r[:path].include?("historical_location")
      end

      # Clean up the (.:format) from the name
      routes.each do |r|
        r[:path] = r[:path].gsub(/\(.:format\)/, "")
      end

      routes = routes.uniq { |r| [r[:verb], r[:path]] }
      routes.sort_by! { |r| r[:path] }

      render json: { routes: Api::RoutesSerializer.index(routes) }
    end
  end
end


