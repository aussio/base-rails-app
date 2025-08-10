module Api
  class RoutesSerializer
    def self.index(routes)
      out = {}
      routes.each do |route|
        entity = bottom_level_entity(route[:path])
        out[entity] ||= []
        out[entity] << show(route)
      end
      out
    end

    def self.show(route)
      {
        verb: route[:verb],
        path: route[:path],
      }
    end

    def self.bottom_level_entity(path)
      # Remove leading/trailing slashes, split by '/', ignore params
      segments = path.gsub(%r{^/|/$}, '').split('/')
      # Find the last static (non-parameter) segment
      segments.reverse.find { |seg| !seg.start_with?(':') }
    end
  end
end